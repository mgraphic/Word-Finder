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
import {
    WordMatchHiliteResponse,
    WordMatchResponse,
    WordMatchHtmlEntry,
} from '../word-match.model';
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

    readonly word = input<string>();
    readonly wordList = input.required<
        WordMatchResponse | WordMatchHiliteResponse
    >();
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

    private sortWordList(): SortedWordListResult;
    private sortWordList(wordList: WordMatchResponse): SortedWordListResult;
    private sortWordList(
        wordList: WordMatchHiliteResponse
    ): SortedWordListResult;
    private sortWordList(
        wordList?: WordMatchResponse | WordMatchHiliteResponse
    ): SortedWordListResult {
        const list = wordList || this.wordList();

        if (list.length === 0) {
            return { groups: [] };
        }

        // Check if it's WordMatchHiliteResponse (array of WordMatchHtmlEntry objects)
        const isHiliteResponse =
            typeof list[0] === 'object' &&
            'text' in list[0] &&
            'html' in list[0];

        const groups = list.reduce((groups, word) => {
            const wordLength = isHiliteResponse
                ? (word as WordMatchHtmlEntry).text.length
                : (word as string).length;
            const group = groups.find((g) => g.count === wordLength);

            if (group) {
                group.words.push(word as any);
            } else {
                groups.push({ count: wordLength, words: [word as any] });
            }

            return groups;
        }, [] as WordListGroup[]);

        const result: SortedWordListResult = {
            groups: groups.sort((a, b) => a.count - b.count).reverse(),
        };

        return result;
    }
}
