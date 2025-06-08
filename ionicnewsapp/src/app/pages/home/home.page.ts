import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Weather } from '../../models/weather.model';
import { Forecast } from '../../models/forecast.model';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular';
import { CitySearchBarComponent } from '../../components/city-search-bar/city-search-bar.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    CitySearchBarComponent,
    WeatherCardComponent,
  ]
})
export class HomePage implements OnInit {
  userName = '';
  weather: Weather | null = null;
  forecast: Forecast | null = null;
  searchWeather: Weather | null = null;
  searchForecast: Forecast | null = null;
  loading = false;
  error: string | null = null;
  searchLoading = false;
  searchError: string | null = null;

  constructor(
    private weatherService: WeatherService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userName = user?.displayName || user?.email || 'usuário';
    await this.loadCurrentLocationWeather();
  }

  async loadCurrentLocationWeather() {
    try {
      this.loading = true;
      this.error = null;
      // Tenta pegar geolocalização real
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.weatherService.getWeatherAndForecastByCoords(lat, lon).subscribe({
        next: (data) => {
          if (data) {
            this.weather = data.weather;
            this.forecast = data.forecast;
          } else {
            this.error = 'Erro ao carregar dados do clima.';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Erro de conexão com a API de clima.';
          this.loading = false;
        },
      });
    } catch (err) {
      this.error = 'Não foi possível obter sua localização.';
      this.loading = false;
    }
  }

  onSearchCity(city: { name: string, lat: number, lon: number }) {
    this.searchWeather = null;
    this.searchForecast = null;
    this.searchLoading = true;
    this.searchError = null;
    this.weatherService.getWeatherAndForecastByCoords(city.lat, city.lon).subscribe({
      next: (data) => {
        if (data) {
          this.searchWeather = data.weather;
          this.searchForecast = data.forecast;
        } else {
          this.searchError = 'Cidade não encontrada.';
        }
        this.searchLoading = false;
      },
      error: () => {
        this.searchError = 'Erro ao buscar cidade.';
        this.searchLoading = false;
      },
    });
  }

  isFavorite(cityId: string): boolean {
    return this.storageService.isFavorite(cityId);
  }

  toggleFavorite(city: Weather) {
    if (this.isFavorite(city.cityId)) {
      this.storageService.removeFavorite(city.cityId);
    } else {
      this.storageService.addFavorite(city.cityId);
    }
  }

  goToFavorites() {
    window.location.href = '/favorites';
  }

  refreshWeather() {
    this.loadCurrentLocationWeather();
  }

  logout() {
    this.authService.logout();
    window.location.href = '/auth';
  }

  getWeatherSuggestion(): string | null {
    if (!this.weather) return null;
    switch (this.weather.condition) {
      case 'Rain':
      case 'Drizzle':
        return 'Leve um guarda-chuva!';
      case 'Snow':
        return 'Vista-se bem, pode nevar!';
      case 'Thunderstorm':
        return 'Evite sair, risco de tempestade!';
      case 'Clear':
        return 'Aproveite o dia ensolarado!';
      case 'Fog':
        return 'Dirija com cuidado, há névoa!';
      case 'Clouds':
        return 'Dia nublado, perfeito para um café!';
      default:
        return null;
    }
  }

  get forecastTomorrow() {
    if (
      this.forecast &&
      Array.isArray(this.forecast.daily) &&
      this.forecast.daily.length > 1 &&
      this.forecast.daily[1] != null
    ) {
      return this.forecast.daily[1];
    }
    return null;
  }

  get forecastNextDays() {
    if (
      this.forecast &&
      Array.isArray(this.forecast.daily) &&
      this.forecast.daily.length > 2
    ) {
      // slice(1, 6) pega do 2º ao 6º dia (exclui o primeiro, que é o atual)
      return this.forecast.daily.slice(1, 6);
    }
    return [];
  }

  get searchForecastNextDays() {
    if (
      this.searchForecast &&
      Array.isArray(this.searchForecast.daily) &&
      this.searchForecast.daily.length > 2
    ) {
      return this.searchForecast.daily.slice(1, 6);
    }
    return [];
  }

  getIconName(icon: string): string {
    const iconMap: Record<string, string> = {
      sun: 'sunny-outline',
      night: 'moon-outline',
      cloud: 'cloudy-outline',
      fog: 'cloud-outline',
      drizzle: 'rainy-outline',
      rain: 'rainy-outline',
      snow: 'snow-outline',
      thunderstorm: 'thunderstorm-outline',
      unknown: 'help-outline',
    };
    return iconMap[icon] || 'cloudy-outline';
  }

  trackByDate(index: number, item: any) {
    return item.date;
  }
}