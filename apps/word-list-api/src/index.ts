import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { environment } from './environment';
import { charMatchHandler } from './handlers/char-match.handler';
import { containsMatchHandler } from './handlers/contains-match.handler';
import { wordMatchHandler } from './handlers/word-match.handler';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 15 }));
app.use((req: Request, res: Response, next: NextFunction) => {
    if (environment.accessToken) {
        if (req.headers['x-access-token'] !== environment.accessToken) {
            res.status(403).send('Access denied. Invalid token');
            return;
        }
    }

    next();
});

app.get('/word-match/:lookup', wordMatchHandler);

app.get('/char-match/:lookup', charMatchHandler);

app.post('/contains-match', containsMatchHandler);

app.listen(environment.port, () => {
    console.log(`Listening on port ${environment.port}`);
});
