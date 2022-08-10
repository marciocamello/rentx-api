import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUi from 'swagger-ui-express';

import { createConnection } from '@shared/infra/typeorm/data-source';

import "@shared/container";

import { AppError } from '@shared/errors/AppError';

import { router } from './routes';

import swaggerFile from '../../../swagger.json';

const app = express();

createConnection();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const port = process.env.PORT || 3333;

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _: Request, response: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

(async () => {
    return app;
})();
