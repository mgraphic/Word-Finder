import { Component, ElementRef, input, output, viewChild } from '@angular/core';

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

    readonly group = input.required<{ count: number; words: string[] }>();
    readonly onClick = output<string>();

    scroll(): void {
        this.elementRef().nativeElement.scrollIntoView({
            behavior: 'smooth',
        });
    }

    protected openDictionary(word: string) {
        this.onClick.emit(word);
    }
}
