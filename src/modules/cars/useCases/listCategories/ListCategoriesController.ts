import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

/**
 * @class ListCategoriesController
 * @description Controller to list all categories
 * @author mac3designer
 */
class ListCategoriesController {

    async handle(request: Request, response: Response): Promise<Response> {

        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

        const allCategories = await listCategoriesUseCase.execute();

        return response.json(allCategories);
    }
}

export { ListCategoriesController };