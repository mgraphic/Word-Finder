import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DictionaryResponseV2 } from './dictionary.model';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private readonly basePath = '/dict-api/v2';
  private readonly http = inject(HttpClient);

  lookupWord(word: string): Observable<DictionaryResponseV2> {
    return this.http.get<DictionaryResponseV2>(
      `${this.basePath}/entries/en/${word}`,
    );
  }
}
