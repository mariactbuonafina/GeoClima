import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Weather } from '../../models/weather.model';
import { ForecastDay } from '../../models/forecast.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weather-card',
  standalone: true,
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class WeatherCardComponent {
  @Input() weather!: Weather;
  @Input() forecastTomorrow?: ForecastDay | null;
  @Input() isFavorite: boolean = false;
  @Output() toggleFavorite = new EventEmitter<Weather>();

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
}