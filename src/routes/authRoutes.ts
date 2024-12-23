import { Router } from "express";
import { login, register } from "../controllers/authController";
import {
	registerValidator,
	loginValidator,
} from "../validators/authValidators";
import { validateRequest } from "../middlewares/validationMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", loginValidator, validateRequest , login);
router.post("/register", registerValidator, validateRequest, register);

export default router;
