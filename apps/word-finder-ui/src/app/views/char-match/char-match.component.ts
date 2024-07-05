import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { WordFinderService } from '../../shared/word-finder.service';
import { WordMatchResponse } from '../../shared/word-match.model';
import { SharedModule } from '../../shared/shared.module';
import { WordsListResultComponent } from '../../shared/words-list-result/words-list-result.component';
import { take } from 'rxjs';

@Component({
    selector: 'app-char-match',
    standalone: true,
    imports: [SharedModule, WordsListResultComponent],
    templateUrl: './char-match.component.html',
    styleUrl: './char-match.component.scss',
})
export class CharMatchComponent implements AfterViewInit {
    searchInput = viewChild<ElementRef>('searchInput');
    foundWords = signal<WordMatchResponse>([]);
    characters = signal<string>('');

    private readonly wordFinderService = inject(WordFinderService);

    // constructor(private wordFinderService: WordFinderService) {}

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
