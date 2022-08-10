import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from "@config/upload";

const categoriesRoutes = Router();
categoriesRoutes.use(ensureAuthenticated);

const uploadCarImage = multer(uploadConfig.upload("car-images"));

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post("/import", uploadCarImage.single("file"), importCategoryController.handle);

export { categoriesRoutes }