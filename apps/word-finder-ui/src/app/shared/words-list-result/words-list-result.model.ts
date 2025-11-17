import { WordMatchHtmlEntry } from '../word-match.model';

export type WordListGroup = {
    count: number;
    words: string[] | WordMatchHtmlEntry[];
};

export type SortedWordListResult = {
    groups: WordListGroup[];
};
