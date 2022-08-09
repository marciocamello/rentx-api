import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body;

        const authenticatUserCase = container.resolve(AuthenticateUserUseCase);

        const token = await authenticatUserCase.execute({ email, password });

        return response.json(token);
    }
}

export { AuthenticateUserController };