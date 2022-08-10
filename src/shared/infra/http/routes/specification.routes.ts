import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();
specificationsRoutes.use(ensureAuthenticated);

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };