import {
    Component,
    AfterViewInit,
    viewChild,
    ElementRef,
    signal,
    inject,
} from '@angular/core';
import { take } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { WordFinderService } from '../../shared/word-finder.service';
import { WordMatchResponse } from '../../shared/word-match.model';
import { WordsListResultComponent } from '../../shared/words-list-result/words-list-result.component';

@Component({
    selector: 'app-words-match',
    standalone: true,
    imports: [SharedModule, WordsListResultComponent],
    templateUrl: './words-match.component.html',
    styleUrl: './words-match.component.scss',
})
export class WordsMatchComponent implements AfterViewInit {
    readonly searchInput = viewChild<ElementRef>('searchInput');
    readonly foundWords = signal<WordMatchResponse>([]);
    readonly word = signal<string>('');

    private readonly wordFinderService = inject(WordFinderService);

    ngAfterViewInit(): void {
        this.searchInput()?.nativeElement.addEventListener(
            'keypress',
            ($event: KeyboardEvent) => {
                if ($event.code === 'Space') {
                    if ($event.shiftKey) {
                        this.word.set(this.word() + '*');
                    } else {
                        this.word.set(this.word() + '_');
                    }

                    $event.preventDefault();
                }
            }
        );
    }

    search(): void {
        if (!this.word().length) {
            this.foundWords.set([]);
            return;
        }

        this.wordFinderService
            .getWordsMatch(this.word())
            .pipe(take(1))
            .subscribe({
                next: this.foundWords.set,
                error: () => this.foundWords.set([]),
            });
    }
}
