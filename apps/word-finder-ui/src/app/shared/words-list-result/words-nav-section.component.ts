import {
    Component,
    ViewChild,
    ElementRef,
    HostListener,
    input,
    output,
} from '@angular/core';
import { SortedWordListResult } from './words-list-result.model';

@Component({
    selector: 'app-words-nav-section',
    standalone: true,
    imports: [],
    templateUrl: './words-nav-section.component.html',
    styleUrl: './words-nav-section.component.scss',
})
export class WordsNavSectionComponent {
    @ViewChild('nav') nav!: ElementRef;

    @HostListener('wheel', ['$event'])
    onScroll($event: WheelEvent): void {
        $event.preventDefault();
        this.nav.nativeElement.scrollLeft += $event.deltaY;
    }

    readonly wordList = input.required<SortedWordListResult>();
    readonly scrollTo = output<number>();

    onClick(index: number): void {
        this.scrollTo.emit(index);
    }
}
