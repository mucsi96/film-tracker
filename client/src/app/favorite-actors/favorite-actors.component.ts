import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FavoriteActorService } from '../favorite-actor.service';

@Component({
  selector: 'app-favorite-actors',
  standalone: true,
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './favorite-actors.component.html',
  styleUrl: './favorite-actors.component.css',
})
export class FavoriteActorsComponent {
  private readonly actorService = inject(FavoriteActorService);
  private readonly snackBar = inject(MatSnackBar);
  readonly actors = this.actorService.actors;
  readonly showInput = signal(false);
  newActorName = '';

  toggleInput() {
    this.showInput.update((v) => !v);
    this.newActorName = '';
  }

  async addActor() {
    if (!this.newActorName.trim()) return;
    await this.actorService.addActor(this.newActorName.trim());
    this.newActorName = '';
    this.showInput.set(false);
    this.snackBar.open('Actor added', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['success'],
    });
  }

  async removeActor(id: number) {
    await this.actorService.deleteActor(id);
  }
}
