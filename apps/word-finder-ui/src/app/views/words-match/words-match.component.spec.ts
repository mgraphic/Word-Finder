import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsMatchComponent } from './words-match.component';

describe('WordsMatchComponent', () => {
  let component: WordsMatchComponent;
  let fixture: ComponentFixture<WordsMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
