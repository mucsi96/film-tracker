import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css',
})
export class SuggestionComponent {
  private readonly suggestionService = inject(SuggestionService);
  readonly suggestion = this.suggestionService.suggestion;
  readonly generating = signal(false);

  async generate() {
    this.generating.set(true);
    try {
      await this.suggestionService.generateSuggestion();
    } finally {
      this.generating.set(false);
    }
  }

  async dismiss() {
    await this.suggestionService.dismissSuggestion();
  }
}
