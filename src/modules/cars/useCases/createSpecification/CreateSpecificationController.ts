import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

/**
 * @class CreateSpecificationController
 * @description Controller to create a new category
 * @author mac3designer
 */
class CreateSpecificationController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { name, description } = request.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

        await createSpecificationUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateSpecificationController };