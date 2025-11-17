import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
    ContainsMatchRequest,
    WordMatchHiliteResponse,
    WordMatchHtmlEntry,
    WordMatchResponse,
} from './word-match.model';

@Injectable({
    providedIn: 'root',
})
export class WordFinderService {
    static readonly MIN_WORD_LENGTH = 3;

    private readonly basePath = '/ws-api';
    private readonly http = inject(HttpClient);

    getWordsMatch(word: string): Observable<WordMatchResponse> {
        return this.http
            .get<WordMatchResponse>(
                `${this.basePath}/word-match/${encodeURIComponent(word)}`
            )
            .pipe(
                map((data: WordMatchResponse) => this.filterWordLength(data))
            );
    }

    getCharMatch(word: string): Observable<WordMatchResponse> {
        return this.http
            .get<WordMatchResponse>(
                `${this.basePath}/char-match/${encodeURIComponent(word)}`
            )
            .pipe(
                map((data: WordMatchResponse) => this.filterWordLength(data))
            );
    }

    getCharMatchHighlighted(word: string): Observable<WordMatchHiliteResponse> {
        return this.http
            .get<WordMatchHiliteResponse>(
                `${this.basePath}/char-match/${encodeURIComponent(word)}`,
                { params: { hilite: 'true' } }
            )
            .pipe(
                map((data: WordMatchHiliteResponse) =>
                    this.filterWordLength(data)
                )
            );
    }

    getContainsMatch(
        match: ContainsMatchRequest
    ): Observable<WordMatchResponse> {
        return this.http
            .post<WordMatchResponse>(`${this.basePath}/contains-match`, match)
            .pipe(
                map((data: WordMatchResponse) => this.filterWordLength(data))
            );
    }

    private filterWordLength(wordsList: WordMatchResponse): WordMatchResponse;
    private filterWordLength(
        wordsList: WordMatchHiliteResponse
    ): WordMatchHiliteResponse;
    private filterWordLength(
        wordsList: WordMatchResponse | WordMatchHiliteResponse
    ): WordMatchResponse | WordMatchHiliteResponse {
        if (wordsList.length === 0) {
            return wordsList;
        }

        // Check if it's WordMatchHiliteResponse (array of WordMatchHtmlEntry objects)
        if (
            typeof wordsList[0] === 'object' &&
            'text' in wordsList[0] &&
            'html' in wordsList[0]
        ) {
            return (wordsList as WordMatchHiliteResponse).filter(
                (wordEntry: WordMatchHtmlEntry) =>
                    wordEntry.text.length >= WordFinderService.MIN_WORD_LENGTH
            );
        }

        // Otherwise it's WordMatchResponse (array of strings)
        return (wordsList as WordMatchResponse).filter(
            (word: string) => word.length >= WordFinderService.MIN_WORD_LENGTH
        );
    }
}
