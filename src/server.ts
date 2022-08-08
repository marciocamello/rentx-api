import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specification.routes';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});