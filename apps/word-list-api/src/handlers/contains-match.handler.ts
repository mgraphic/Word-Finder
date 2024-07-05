import { Request, Response } from 'express';
import { ContainsMatchRequest } from '../shared/model';
import { wordContainsMatchSearch } from '../shared/utils';

export function containsMatchHandler(
    req: Request<{}, {}, ContainsMatchRequest>,
    res: Response
): void {
    const { startsWith, contains, endsWith } = req.body;

    if (!startsWith && !contains && !endsWith) {
        res.status(400).send(
            'Request is missing at least one required body parameter (contains, startsWith, endsWith)'
        );

        return;
    }

    res.json(wordContainsMatchSearch({ startsWith, contains, endsWith }));
}
