import axios, { AxiosError } from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { environment } from './environment';

const router = Router();

router.all(
    '/:apiKey/*',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let baseUrl: string;
        let forwardHeaders: boolean;

        switch (req.params.apiKey) {
            case 'ws-api':
                baseUrl = environment.apis.wordFinder.url;
                forwardHeaders = environment.apis.wordFinder.forwardHeaders;
                break;

            case 'dict-api':
                baseUrl = environment.apis.dictionary.url;
                forwardHeaders = environment.apis.dictionary.forwardHeaders;
                break;

            default:
                next();
                return;
        }

        try {
            const response = await axios({
                url: `${baseUrl}/${req.params[0]}`,
                method: req.method,
                data: req.body,
                headers: forwardHeaders ? req.headers : undefined,
            });

            res.status(response.status).send(response.data);
        } catch (err: unknown) {
            const isError = axios.isAxiosError(err);

            res.status((isError && err.response?.status) || 500).send(
                isError ? err.message : err
            );
            res.json((err as AxiosError).request.data);
        }
    }
);

export default router;
