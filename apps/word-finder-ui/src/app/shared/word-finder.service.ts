import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ContainsMatchRequest, WordMatchResponse } from './word-match.model';

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
            .pipe(map(this.filterWordLength));
    }

    getCharMatch(word: string): Observable<WordMatchResponse> {
        return this.http
            .get<WordMatchResponse>(
                `${this.basePath}/char-match/${encodeURIComponent(word)}`
            )
            .pipe(map(this.filterWordLength));
    }

    getContainsMatch(
        match: ContainsMatchRequest
    ): Observable<WordMatchResponse> {
        return this.http
            .post<WordMatchResponse>(`${this.basePath}/contains-match`, match)
            .pipe(map(this.filterWordLength));
    }

    private filterWordLength(wordsList: WordMatchResponse): WordMatchResponse {
        return wordsList.filter(
            (word: string): boolean =>
                word.length >= WordFinderService.MIN_WORD_LENGTH
        );
    }
}
