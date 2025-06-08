import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { WeatherService } from '../../services/weather.service';
import { Favorite } from '../../models/favorite.model';
import { Weather } from '../../models/weather.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  imports: [IonicModule, CommonModule],
  providers: [DatePipe]
})
export class FavoritesPage implements OnInit {
  favorites: Favorite[] = [];
  weatherData: { [cityId: string]: Weather | null } = {};
  loading = false;

  constructor(
    private storageService: StorageService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading = true;
    this.favorites = this.storageService.getFavorites();
    this.weatherData = {};
    this.favorites.forEach(fav => {
      // cityId = "lat,lon"
      const [lat, lon] = fav.cityId.split(',').map(Number);
      this.weatherService.getWeatherAndForecastByCoords(lat, lon).subscribe(result => {
        this.weatherData[fav.cityId] = result?.weather || null;
      });
    });
    this.loading = false;
  }

  removeFavorite(cityId: string) {
    this.storageService.removeFavorite(cityId);
    this.loadFavorites();
  }
}