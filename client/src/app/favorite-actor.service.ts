import { HttpClient } from '@angular/common/http';
import { Injectable, inject, resource, signal } from '@angular/core';
import { fetchJson } from './utils/fetchJson';

export interface FavoriteActor {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteActorService {
  private readonly http = inject(HttpClient);
  private readonly reloadTrigger = signal(0);

  actors = resource<FavoriteActor[], {}>({
    request: () => ({ reload: this.reloadTrigger() }),
    loader: () => fetchJson<FavoriteActor[]>(this.http, '/api/favorite-actors'),
  });

  async addActor(name: string) {
    await fetchJson<FavoriteActor>(this.http, '/api/favorite-actors', {
      method: 'post',
      body: { name },
    });
    this.reloadTrigger.update((v) => v + 1);
  }

  async deleteActor(id: number) {
    await fetchJson<void>(this.http, `/api/favorite-actors/${id}`, {
      method: 'delete',
    });
    this.reloadTrigger.update((v) => v + 1);
  }
}
