import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainsMatchComponent } from './contains-match.component';

describe('ContainsMatchComponent', () => {
  let component: ContainsMatchComponent;
  let fixture: ComponentFixture<ContainsMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainsMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainsMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
