import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Weather } from '../models/weather.model';
import { Forecast, ForecastDay, ForecastHour } from '../models/forecast.model';
import { WeatherCondition } from '../types/weather-condition.enum';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeatherAndForecastByCoords(lat: number, lon: number): Observable<{ weather: Weather; forecast: Forecast } | null> {
    const params = new HttpParams()
      .set('latitude', lat)
      .set('longitude', lon)
      .set('current_weather', 'true')
      .set('hourly', 'temperature_2m,weathercode,relativehumidity_2m')
      .set('daily', 'temperature_2m_max,temperature_2m_min,weathercode')
      .set('timezone', 'auto');

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(data => {
        const weather = this.transformWeather(data, lat, lon);
        const forecast = this.transformForecast(data, lat, lon);
        return { weather, forecast };
      }),
      catchError(_ => of(null))
    );
  }

  // Transformação dos dados atuais
  private transformWeather(data: any, lat: number, lon: number): Weather {
    const current = data.current_weather;
    const cityName = ''; // Você pode preencher esse campo se usar uma API de geocoding
    return {
      cityId: `${lat},${lon}`,
      cityName: cityName,
      country: '',
      temperature: current.temperature,
      description: this.weatherCodeToDescription(current.weathercode),
      condition: this.weatherCodeToCondition(current.weathercode),
      icon: this.weatherCodeToIcon(current.weathercode, current.is_day),
      humidity: data.hourly?.relativehumidity_2m?.[0] || 0,
      windSpeed: current.windspeed,
      date: new Date(current.time).toISOString(),
      timestamp: new Date(current.time).getTime() / 1000,
    };
  }

  // Transformação da previsão
  private transformForecast(data: any, lat: number, lon: number): Forecast {
    const daily: ForecastDay[] = [];
    if (data.daily) {
      for (let i = 0; i < data.daily.time.length; i++) {
        daily.push({
          date: data.daily.time[i],
          minTemp: data.daily.temperature_2m_min[i],
          maxTemp: data.daily.temperature_2m_max[i],
          description: this.weatherCodeToDescription(data.daily.weathercode[i]),
          condition: this.weatherCodeToCondition(data.daily.weathercode[i]),
          icon: this.weatherCodeToIcon(data.daily.weathercode[i], 1),
        });
      }
    }

    const hourly: ForecastHour[] = [];
    if (data.hourly) {
      for (let i = 0; i < data.hourly.time.length; i++) {
        hourly.push({
          dateTime: data.hourly.time[i],
          temperature: data.hourly.temperature_2m[i],
          description: this.weatherCodeToDescription(data.hourly.weathercode[i]),
          condition: this.weatherCodeToCondition(data.hourly.weathercode[i]),
          icon: this.weatherCodeToIcon(data.hourly.weathercode[i], 1),
        });
      }
    }

    return {
      cityId: `${lat},${lon}`,
      daily,
      hourly,
    };
  }

  // Helpers para converter os códigos do Open-Meteo
  private weatherCodeToDescription(code: number): string {
    // Veja a documentação de weather codes do Open-Meteo!
    const map: { [key: number]: string } = {
      0: 'Céu limpo',
      1: 'Principalmente limpo',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Névoa',
      48: 'Névoa gelada',
      51: 'Garoa leve',
      53: 'Garoa moderada',
      55: 'Garoa densa',
      56: 'Garoa congelante leve',
      57: 'Garoa congelante densa',
      61: 'Chuva leve',
      63: 'Chuva moderada',
      65: 'Chuva forte',
      66: 'Chuva congelante leve',
      67: 'Chuva congelante forte',
      71: 'Neve leve',
      73: 'Neve moderada',
      75: 'Neve forte',
      77: 'Granizo',
      80: 'Aguaceiro leve',
      81: 'Aguaceiro moderado',
      82: 'Aguaceiro violento',
      85: 'Neve em aguaceiro leve',
      86: 'Neve em aguaceiro forte',
      95: 'Tempestade',
      96: 'Tempestade com granizo leve',
      99: 'Tempestade com granizo forte'
    };
    return map[code] || 'Desconhecido';
  }

private weatherCodeToCondition(code: number): WeatherCondition {
  if ([0, 1].includes(code)) return WeatherCondition.Clear;
  if ([2, 3].includes(code)) return WeatherCondition.Clouds;
  if ([45, 48].includes(code)) return WeatherCondition.Fog;
  if ([51, 53, 55, 56, 57].includes(code)) return WeatherCondition.Drizzle;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return WeatherCondition.Rain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return WeatherCondition.Snow;
  if ([95, 96, 99].includes(code)) return WeatherCondition.Thunderstorm;
  return WeatherCondition.Unknown;
}

  private weatherCodeToIcon(code: number, isDay: number): string {
    // Aqui você pode mapear para ícones próprios ou do OpenWeatherMap, se preferir.
    // Exemplo:
    if ([0, 1].includes(code)) return isDay ? 'sun' : 'night';
    if ([2, 3].includes(code)) return 'cloud';
    if ([45, 48].includes(code)) return 'fog';
    if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
    if ([95, 96, 99].includes(code)) return 'thunderstorm';
    return 'unknown';
  }
}