import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DictionaryService } from './dictionary.service';
import { SharedModule } from '../shared.module';
import { DictionaryResponseV2 } from './dictionary.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [SharedModule, MatIconModule],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.scss',
})
export class DictionaryComponent implements OnInit {
  lookup = input.required<string>();
  response = signal<DictionaryResponseV2 | null>(null);
  completed = signal<boolean>(false);

  private readonly dictionaryService = inject(DictionaryService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toasterService = inject(ToasterService);
  private readonly matDialogService = inject(MatDialog);

  ngOnInit(): void {
    this.dictionaryService
      .lookupWord(this.lookup())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: DictionaryResponseV2): void => {
          this.response.set(response);
          this.completed.set(true);
        },
        error: (err: HttpErrorResponse): void => {
          this.completed.set(true);
          this.toasterService.error('Dictionary term not found');

          setTimeout(() => {
            this.matDialogService.closeAll();
          }, 2000);
          // console.error(err.message);
        },
      });
  }

  playAudio(url: string): void {
    const audio = new Audio(url);
    audio.load();
    audio.play();
  }
}
