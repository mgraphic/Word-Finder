import { Component, ViewChild, ElementRef, input, output } from '@angular/core';

@Component({
    selector: 'app-words-group-section',
    standalone: true,
    imports: [],
    templateUrl: './words-group-section.component.html',
    styleUrl: './words-group-section.component.scss',
})
export class WordsGroupSectionComponent {
    @ViewChild('section', { static: true, read: ElementRef })
    private readonly elementRef!: ElementRef<HTMLElement>;

    readonly group = input.required<{ count: number; words: string[] }>();
    readonly onClick = output<string>();

    scroll(): void {
        this.elementRef.nativeElement.scrollIntoView({
            behavior: 'smooth',
        });
    }

    protected openDictionary(word: string) {
        this.onClick.emit(word);
    }
}
