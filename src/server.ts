import express from 'express';

import { router } from './routes';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});