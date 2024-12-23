import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Container } from "typedi";
import { DI_KEYS } from "../constants/diKeys";
import { JwtPayload } from "../models/jwtPayloadModel";



export const authMiddleware = (req: Request, res: Response, next: NextFunction):  void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        // Inject user into DI Container
        Container.set(DI_KEYS.CURRENT_USER, decoded);

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};
