import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsListResultComponent } from './words-list-result.component';

describe('WordsListResultComponent', () => {
  let component: WordsListResultComponent;
  let fixture: ComponentFixture<WordsListResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsListResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsListResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
