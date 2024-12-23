import { Response } from 'express';

export const successResponse = <T>(res: Response, data: T, message: string, statusCode: number = 200): Response => {
    return res.status(statusCode).json({
        success: true,
        status: statusCode,
        message,
        data,
    });
};

export const errorResponse = (res: Response, message: string, statusCode: number = 500): Response => {
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        data: null,
    });
};
