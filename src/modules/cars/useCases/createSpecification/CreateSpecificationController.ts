import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

/**
 * @class CreateSpecificationController
 * @description Controller to create a new category
 * @author mac3designer
 */
class CreateSpecificationController {

    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

    handle(request: Request, response: Response): Response {

        const { name, description } = request.body;

        try {

            this.createSpecificationUseCase.execute({ name, description });

            return response.status(201).send();
        } catch (err) {

            return response.status(400).json({
                error: err.message
            });
        }
    }
}

export { CreateSpecificationController };