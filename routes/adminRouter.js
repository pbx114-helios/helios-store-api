import { Router } from "express";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const maxAge = 3 * 60 * 60;

// Logs in the user
router.post("/login/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(user)
        if (!user) {
            res.json({
                msg: "You are not an admin or you have entered the wrong username",
            });
            return;
        }
        const result = await bcrypt.compare(password, user.password);
        if (result == true) {
            const token = jwt.sign(
                { username: user.username, user_id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: maxAge }
            );
            res.cookie("token", token, {
                maxAge: maxAge * 1000,
                httpOnly: true,
                path : "/"
            }).json({
                msg: "Successful login",
                username: user.username,
                token
            });
            return;
        } else {
            res.status(401).json({ msg: "Incorrect password" });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong", err });
    }
});

// Logout
router.get("/logout/", (req, res) => {
    res.clearCookie("token").redirect("/");
});

// Signs up a new user
router.post("/signup/", async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        // Check if user already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            res.json({
                msg: "There's a user with this username in the records",
            });
            return;
        }

        // Creating a new user entry
        const hashed_pwd = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            password: hashed_pwd,
            email,
        });
        await newUser.save();
        res.json({ message: "Successfully signed up", redirect_url: "/login" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Oops something went wrong", err });
    }
});

export default router;
