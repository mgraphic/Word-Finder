import { Request, Response } from 'express';
import { charMatchSearch } from '../shared/utils';

export function charMatchHandler(req: Request, res: Response): void {
    const { params } = req;

    if (!params.lookup) {
        res.status(400).json([]);
        return;
    }

    res.json(charMatchSearch(params.lookup));
}
