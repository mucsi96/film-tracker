import { HttpClient } from '@angular/common/http';
import { Injectable, inject, resource, signal } from '@angular/core';
import { fetchJson } from './utils/fetchJson';

export interface Film {
  id: number;
  title: string;
  year: number;
  actor1: string;
  actor2: string;
  score: number;
}

export interface FilmRequest {
  title: string;
  year: number;
  actor1: string;
  actor2: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private readonly http = inject(HttpClient);
  private readonly reloadTrigger = signal(0);

  films = resource<Film[], {}>({
    request: () => ({ reload: this.reloadTrigger() }),
    loader: () => fetchJson<Film[]>(this.http, '/api/films'),
  });

  async addFilm(request: FilmRequest) {
    await fetchJson<Film>(this.http, '/api/films', {
      method: 'post',
      body: request,
    });
    this.reloadTrigger.update((v) => v + 1);
  }

  async deleteFilm(id: number) {
    await fetchJson<void>(this.http, `/api/films/${id}`, {
      method: 'delete',
    });
    this.reloadTrigger.update((v) => v + 1);
  }
}
