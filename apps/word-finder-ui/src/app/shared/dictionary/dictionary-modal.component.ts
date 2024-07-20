import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DictionaryComponent } from './dictionary.component';

@Component({
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
    readonly lookup = input.required<string>();

    ngOnInit(): void {
        console.log(this.lookup());
    }
}
