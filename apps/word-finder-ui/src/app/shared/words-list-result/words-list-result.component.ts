import { Component, Signal, computed, inject, input } from '@angular/core';
import { SharedModule } from '../shared.module';
import { WordMatchResponse } from '../word-match.model';
import { SortedWordListResult, WordListGroup } from './words-list-result.model';
import { DictionaryModalComponent } from '../dictionary/dictionary-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-words-list-result',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatDialogModule],
  templateUrl: './words-list-result.component.html',
  styleUrl: './words-list-result.component.scss',
})
export class WordsListResultComponent {
  private readonly dialog = inject(MatDialog);

  wordList = input.required<WordMatchResponse>();
  sortedWordList: Signal<SortedWordListResult> = computed(() =>
    this.sortWordList(),
  );

  constructor() {
    // effect(() => console.log(this.wordList()));
    // setTimeout(() => this.openDictionary('hello'), 1000);
  }

  openDictionary(word: string) {
    const dialogRef = this.dialog.open(DictionaryModalComponent);
    dialogRef.componentRef?.setInput('lookup', word);
  }

  private sortWordList(): SortedWordListResult {
    const wordList = this.wordList();
    const groups = wordList.reduce((groups, word) => {
      const group = groups.find((g) => g.count === word.length);

      if (group) {
        group.words.push(word);
      } else {
        groups.push({ count: word.length, words: [word] });
      }

      return groups;
    }, [] as WordListGroup[]);

    const result: SortedWordListResult = {
      groups: groups.sort((a, b) => a.count - b.count).reverse(),
    };

    return result;
  }
}
