import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsNavSectionComponent } from './words-nav-section.component';

describe('WordsNavSectionComponent', () => {
    let component: WordsNavSectionComponent;
    let fixture: ComponentFixture<WordsNavSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WordsNavSectionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WordsNavSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
