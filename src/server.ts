import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from './database/data-source';

import "./shared/container";

import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

createConnection();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const port = process.env.PORT || 3333;

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
