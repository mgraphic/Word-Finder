import { Component, inject, model, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../shared/shared.module';
import { WordsListResultComponent } from '../../shared/words-list-result/words-list-result.component';
import { WordMatchResponse } from '../../shared/word-match.model';
import { WordFinderService } from '../../shared/word-finder.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-contains-match',
  standalone: true,
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    WordsListResultComponent,
  ],
  templateUrl: './contains-match.component.html',
  styleUrl: './contains-match.component.scss',
})
export class ContainsMatchComponent {
  startsWith = signal<string>('');
  contains = signal<string>('');
  endsWith = signal<string>('');
  foundWords = signal<WordMatchResponse>([]);

  private readonly wordFinderService = inject(WordFinderService);

  search(): void {
    this.wordFinderService
      .getContainsMatch({
        startsWith: this.startsWith(),
        contains: this.contains(),
        endsWith: this.endsWith(),
      })
      .pipe(take(1))
      .subscribe({
        next: this.foundWords.set,
        error: () => this.foundWords.set([]),
      });
  }
}
