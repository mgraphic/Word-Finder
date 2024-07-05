import { Component, OnInit, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DictionaryComponent } from './dictionary.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  // selector: 'app-dictionary-modal',
  standalone: true,
  imports: [
    DictionaryComponent,
    MatButtonModule,
    MatDialogModule,
    UpperCasePipe,
  ],
  templateUrl: './dictionary-modal.component.html',
  styleUrl: './dictionary-modal.component.scss',
})
export class DictionaryModalComponent implements OnInit {
  lookup = input.required<string>();
  // activeModal = inject(NgbActiveModal);

  // private readonly matDialogService = inject(MatDialog);

  constructor() {
    // console.log(this.lookup());
  }

  ngOnInit(): void {
    console.log(this.lookup());
  }
}
