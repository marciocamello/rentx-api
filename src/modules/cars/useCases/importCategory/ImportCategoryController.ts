import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

/**
 * @class ImportCategoryController
 * @description Controller to import a category from CSV file
 * @author mac3designer
 */
class ImportCategoryController {

    constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

    handle(request: Request, response: Response): Response {

        const { file } = request;

        this.importCategoryUseCase.execute(file);

        return response.status(201).send();
    }
}

export { ImportCategoryController };