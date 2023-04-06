import { verify } from "jsonwebtoken";

export const requireAuth = (role) => {
    return (req, res, next) => {
        const token = req.cookies.token || req.body.token || req.headers['access-token'];
        if (!token) {
            res.status(401).json({
                msg: "You need to be logged in to execute this",
            });
            return;
        }
        const token_data = verify(token, process.env.JWT_SECRET);
        if (!token_data || role !== token_data.role) {
            res.status(401).json({
                msg: "You do not have the permission to get this data",
            });
            return;
        }
        // Set some res.locals
        next();
    };
};
