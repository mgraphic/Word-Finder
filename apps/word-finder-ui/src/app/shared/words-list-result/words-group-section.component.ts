import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { WordMatchHtmlEntry } from '../word-match.model';

@Component({
    selector: 'app-words-group-section',
    standalone: true,
    imports: [],
    templateUrl: './words-group-section.component.html',
    styleUrl: './words-group-section.component.scss',
})
export class WordsGroupSectionComponent {
    private readonly elementRef =
        viewChild.required<ElementRef<HTMLElement>>('section');

    readonly group = input.required<{
        count: number;
        words: string[] | WordMatchHtmlEntry[];
    }>();
    readonly onClick = output<string>();

    scroll(): void {
        this.elementRef().nativeElement.scrollIntoView({
            behavior: 'smooth',
        });
    }

    protected openDictionary(word: string | WordMatchHtmlEntry) {
        const wordText = this.getWordText(word);
        this.onClick.emit(wordText);
    }

    protected getWordText(word: string | WordMatchHtmlEntry): string {
        return typeof word === 'string' ? word : word.text;
    }

    protected getWordDisplay(word: string | WordMatchHtmlEntry): string {
        return typeof word === 'string' ? word : word.html;
    }

    protected isHtmlEntry(
        word: string | WordMatchHtmlEntry
    ): word is WordMatchHtmlEntry {
        return typeof word === 'object' && 'html' in word;
    }
}
