import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FilmService, FilmRequest } from '../film.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsComponent {
  private readonly filmService = inject(FilmService);
  private readonly snackBar = inject(MatSnackBar);
  readonly films = this.filmService.films;
  readonly showForm = signal(false);
  readonly saving = signal(false);

  newFilm: FilmRequest = { title: '', year: 2024, actor1: '', actor2: '', score: 7 };
  readonly scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  toggleForm() {
    this.showForm.update((v) => !v);
    if (this.showForm()) {
      this.newFilm = { title: '', year: 2024, actor1: '', actor2: '', score: 7 };
    }
  }

  async addFilm() {
    if (!this.newFilm.title || !this.newFilm.actor1 || !this.newFilm.actor2) return;
    this.saving.set(true);
    try {
      await this.filmService.addFilm(this.newFilm);
      this.showForm.set(false);
      this.snackBar.open('Film added', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success'],
      });
    } finally {
      this.saving.set(false);
    }
  }

  async deleteFilm(id: number) {
    await this.filmService.deleteFilm(id);
  }

  getScoreLabel(score: number): string {
    const labels: Record<number, string> = {
      1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
      6: '6', 7: '7', 8: '8', 9: '9', 10: '10',
    };
    return labels[score] ?? String(score);
  }

  getScoreStars(score: number): string {
    return '\u2605'.repeat(Math.round(score / 2)) + '\u2606'.repeat(5 - Math.round(score / 2));
  }
}
