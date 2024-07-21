import {
    Component,
    ViewChildren,
    QueryList,
    inject,
    input,
    Signal,
    computed,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DictionaryModalComponent } from '../dictionary/dictionary-modal.component';
import { SharedModule } from '../shared.module';
import { WordMatchResponse } from '../word-match.model';
import { WordsGroupSectionComponent } from './words-group-section.component';
import { SortedWordListResult, WordListGroup } from './words-list-result.model';
import { WordsNavSectionComponent } from './words-nav-section.component';

@Component({
    selector: 'app-words-list-result',
    standalone: true,
    imports: [
        SharedModule,
        MatButtonModule,
        MatDialogModule,
        WordsGroupSectionComponent,
        WordsNavSectionComponent,
    ],
    templateUrl: './words-list-result.component.html',
    styleUrl: './words-list-result.component.scss',
})
export class WordsListResultComponent {
    @ViewChildren(WordsGroupSectionComponent)
    private readonly groupSections!: QueryList<WordsGroupSectionComponent>;
    private readonly dialog = inject(MatDialog);

    readonly wordList = input.required<WordMatchResponse>();
    readonly sortedWordList: Signal<SortedWordListResult> = computed(() =>
        this.sortWordList()
    );

    openDictionary(word: string) {
        const dialogRef = this.dialog.open(DictionaryModalComponent);
        dialogRef.componentRef?.setInput('lookup', word);
    }

    scrollTo(index: number): void {
        this.groupSections.get(index)?.scroll();
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
