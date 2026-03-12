import { HttpClient } from '@angular/common/http';
import { Injectable, inject, resource, signal } from '@angular/core';
import { fetchJson } from './utils/fetchJson';

export interface Suggestion {
  id: number;
  title: string;
  year: number;
  reason: string;
}

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private readonly http = inject(HttpClient);
  private readonly reloadTrigger = signal(0);

  suggestion = resource<Suggestion | null, {}>({
    request: () => ({ reload: this.reloadTrigger() }),
    loader: () => fetchJson<Suggestion | null>(this.http, '/api/suggestion'),
  });

  async generateSuggestion() {
    await fetchJson<Suggestion>(this.http, '/api/suggestion/generate', {
      method: 'post',
    });
    this.reloadTrigger.update((v) => v + 1);
  }

  async dismissSuggestion() {
    await fetchJson<void>(this.http, '/api/suggestion', {
      method: 'delete',
    });
    this.reloadTrigger.update((v) => v + 1);
  }
}
