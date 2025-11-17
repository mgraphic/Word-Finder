import { Request, Response } from 'express';
import {
    charMatchSearch,
    hiliteMatch,
    isHiliteRequested,
} from '../shared/utils';

export function charMatchHandler(req: Request, res: Response): void {
    const { params } = req;

    // const queryString = req.url?.split('?')[1] || '';
    // console.log(
    //     'charMatchHandler called with params:',
    //     params,
    //     'queryString:',
    //     queryString,
    //     new URLSearchParams(queryString)
    // );

    // console.log(isHiliteRequested(req.url));

    if (!params.lookup) {
        res.status(400).json([]);
        return;
    }

    const result = charMatchSearch(params.lookup);

    if (isHiliteRequested(req.url)) {
        // Apply highlighting to the result
        res.json(
            result.map((word) => ({
                text: word,
                html: hiliteMatch(word, params.lookup),
            }))
        );
        return;
    }

    res.json(result);
}
