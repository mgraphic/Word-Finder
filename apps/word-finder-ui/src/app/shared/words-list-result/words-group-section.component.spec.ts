import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsGroupSectionComponent } from './words-group-section.component';

describe('WordsGroupSectionComponent', () => {
    let component: WordsGroupSectionComponent;
    let fixture: ComponentFixture<WordsGroupSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WordsGroupSectionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WordsGroupSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
