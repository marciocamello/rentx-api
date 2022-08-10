import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "8e7d8d5f9a4fc18756cbb8bb768d31ea") as IPayload;

        const usersRespository = new UsersRepository();
        const user = await usersRespository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", 401);
        }

        request.user = {
            id: user_id,
        }

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}