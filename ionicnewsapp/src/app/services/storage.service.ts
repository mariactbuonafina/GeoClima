import { Injectable } from '@angular/core';
import { Favorite } from '../models/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private FAVORITES_KEY = 'favorites';

  constructor() {}

  getFavorites(): Favorite[] {
    const data = localStorage.getItem(this.FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  addFavorite(cityId: string): void {
    const favorites = this.getFavorites();
    if (!favorites.find(fav => fav.cityId === cityId)) {
      favorites.push({ cityId, addedAt: Date.now() });
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  removeFavorite(cityId: string): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav.cityId !== cityId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  isFavorite(cityId: string): boolean {
    return this.getFavorites().some(fav => fav.cityId === cityId);
  }

  clearFavorites(): void {
    localStorage.removeItem(this.FAVORITES_KEY);
  }
}