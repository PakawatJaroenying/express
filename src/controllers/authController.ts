import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { errorResponse, successResponse } from "../utils/ApiResponse";
import Container from "typedi";
import UserService from "../services/UserService";
import { RegisterRequest, LoginRequest } from "../models/authModel";
import bcrypt from "bcrypt";
import { JwtPayload } from "../models/jwtPayloadModel";
import { CurrentUserService } from "../services/CurrentUser";

const userService = Container.get(UserService);
const currentUserService = Container.get(CurrentUserService);

const register = async (
	req: Request<{}, {}, RegisterRequest>,
	res: Response
) => {
	try {
		const { username, password } = req.body;
		const queryRunner = AppDataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = await userService.createUser(username, hashedPassword);
			successResponse(res, newUser, "User registered successfully", 201);
		} catch {
			await queryRunner.rollbackTransaction();
			throw new Error("Failed to create user");
		}
	} catch (error) {
		console.error(error);
		errorResponse(res, "Server error", 500);
	}
};

const login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await userService.findByUsername(username);
		const payload: JwtPayload = {
			id: user!.id,
			username: user!.username,
		};
		const accessToken = userService.generateAccessToken(payload);
		const refreshToken = userService.generateRefreshToken(payload);

		await userService.saveRefreshToken(user!.id, refreshToken);

		successResponse(
			res,
			{
				user,
				accessToken,
				refreshToken,
			},
			"Login successful"
		);
	} catch (error) {
		console.error(error);
		errorResponse(res, "Server error", 500);
	}
};

export { register, login };
