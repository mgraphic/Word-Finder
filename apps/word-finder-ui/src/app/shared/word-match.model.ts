import { RequireAtLeastOne } from './shared.model';

export interface WordMatchHtmlEntry {
    text: string;
    html: string;
}

export type WordMatchHiliteResponse = WordMatchHtmlEntry[];

export type WordMatchResponse = string[];

export type ContainsMatchRequest = RequireAtLeastOne<
    {
        startsWith?: string;
        contains?: string;
        endsWith?: string;
    },
    'startsWith' | 'contains' | 'endsWith'
>;
