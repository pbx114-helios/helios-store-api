import {verify} from "jsonwebtoken";

export const requireAuth = () => {
    (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            // redirect to some login page
            return;
        }
        const isLoggedIn = verify(token, process.env.JWT_SECRET);
        if (!isLoggedIn) {
            res.status(401).redirect("/login");
            return;
        }
        // Set some res.locals
        next();
    };
};
