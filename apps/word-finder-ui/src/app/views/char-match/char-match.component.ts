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
    selector: 'app-char-match',
    standalone: true,
    imports: [SharedModule, WordsListResultComponent],
    templateUrl: './char-match.component.html',
    styleUrl: './char-match.component.scss',
})
export class CharMatchComponent implements AfterViewInit {
    readonly searchInput = viewChild<ElementRef>('searchInput');
    readonly foundWords = signal<WordMatchResponse>([]);
    readonly characters = signal<string>('');

    private readonly wordFinderService = inject(WordFinderService);

    ngAfterViewInit(): void {
        this.searchInput()?.nativeElement.addEventListener(
            'keypress',
            ($event: KeyboardEvent) => {
                if ($event.code === 'Space') {
                    this.characters.set(this.characters() + '*');

                    $event.preventDefault();
                }
            }
        );
    }

    search(): void {
        if (!this.characters().length) {
            this.foundWords.set([]);
            return;
        }

        this.wordFinderService
            .getCharMatch(this.characters())
            .pipe(take(1))
            .subscribe({
                next: this.foundWords.set,
                error: () => this.foundWords.set([]),
            });
    }
}
