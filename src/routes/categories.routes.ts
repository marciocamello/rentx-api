import os from 'os';
import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

const TEMP_DIR = os.tmpdir();

const upload = multer({
    dest: TEMP_DIR
});

categoriesRoutes.post("/", (request, response) => {

    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {

    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {

    return importCategoryController.handle(request, response);
});

export { categoriesRoutes }