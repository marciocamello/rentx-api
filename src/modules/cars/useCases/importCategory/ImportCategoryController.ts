import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

/**
 * @class ImportCategoryController
 * @description Controller to import a category from CSV file
 * @author mac3designer
 */
class ImportCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { file } = request;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        await importCategoryUseCase.execute(file);

        return response.status(201).send();
    }
}

export { ImportCategoryController };