import { verify } from "jsonwebtoken";

export const requireAuth = () => {
    return (req, res, next) => {
        const token = req.cookies.token || req.body.token;
        if (!token) {
            res.status(401).json({
                msg: "You need to be logged in to execute this",
            });
            return;
        }
        const isLoggedIn = verify(token, process.env.JWT_SECRET);
        if (!isLoggedIn) {
            res.status(401).json({
                msg: "You need to be logged in to execute this",
            });
            return;
        }
        // Set some res.locals
        next();
    };
};
