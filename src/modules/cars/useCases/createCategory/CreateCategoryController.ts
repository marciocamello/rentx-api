import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

/**
 * @class CreateCategoryController
 * @description Controller to create a new category
 * @author mac3designer
 */
class CreateCategoryController {

    constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

    handle(request: Request, response: Response): Response {

        const { name, description } = request.body;

        try {

            this.createCategoryUseCase.execute({ name, description });

            return response.status(201).send();
        } catch (err) {

            return response.status(400).json({
                error: err.message
            });
        }
    }
}

export { CreateCategoryController };