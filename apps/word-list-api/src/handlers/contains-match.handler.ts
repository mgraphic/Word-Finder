import { Request, Response } from 'express';
import { ContainsMatchRequest } from '../shared/model';
import { wordContainsMatchSearch } from '../shared/utils';

export function containsMatchHandler(
    req: Request<{}, {}, ContainsMatchRequest>,
    res: Response,
): void {
    const { startsWith, contains, endsWith, length } = req.body;

    if (
        !startsWith &&
        !contains &&
        !endsWith &&
        (length === undefined || isNaN(length) || length < 3)
    ) {
        res.status(400).send(
            'Request is missing at least one required body parameter (contains, startsWith, endsWith, length)',
        );

        return;
    }

    res.json(
        wordContainsMatchSearch({ startsWith, contains, endsWith, length }),
    );
}
