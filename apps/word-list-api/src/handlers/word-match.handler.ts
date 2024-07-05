import { Request, Response } from 'express';
import { wordMatchSearch } from '../shared/utils';

export function wordMatchHandler(req: Request, res: Response): void {
    const { params } = req;

    if (!params.lookup) {
        res.status(400).json([]);
        return;
    }

    res.json(wordMatchSearch(params.lookup));
}
