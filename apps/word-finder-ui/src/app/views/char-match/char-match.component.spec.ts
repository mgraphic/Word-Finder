import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharMatchComponent } from './char-match.component';

describe('CharMatchComponent', () => {
  let component: CharMatchComponent;
  let fixture: ComponentFixture<CharMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
