import express, { Response, json } from 'express';
import compression from 'compression';
import path from 'path';
import { environment } from './environment';
import cors from 'cors';
import router from './api-router';

const app = express();

app.use(cors());
app.use(json());
app.use(compression());

app.all('*', router);

const dirname = new URL('.', import.meta.url).pathname;
const publicPath = path.resolve(dirname, '../public');

app.use(express.static(publicPath));

app.all('*', (_, res: Response): void => {
    res.sendFile(`/`, { root: publicPath });
});

app.listen(environment.port, () => {
    console.log(`Gateway listening on port ${environment.port}`);
});
