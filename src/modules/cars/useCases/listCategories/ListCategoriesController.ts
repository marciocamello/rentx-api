import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

/**
 * @class ListCategoriesController
 * @description Controller to list all categories
 * @author mac3designer
 */
class ListCategoriesController {

    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

    handle(request: Request, response: Response) {

        const categories = this.listCategoriesUseCase.execute();

        return response.json(categories);
    }
}

export { ListCategoriesController };