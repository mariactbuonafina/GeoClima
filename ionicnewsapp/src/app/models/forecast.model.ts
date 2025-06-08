import { WeatherCondition } from '../types/weather-condition.enum';

export interface Forecast {
  cityId: string;
  daily: ForecastDay[];
  hourly: ForecastHour[];
}

export interface ForecastDay {
  date: string; // "2025-05-23"
  minTemp: number;
  maxTemp: number;
  description: string;
  condition: WeatherCondition;
  icon: string;
}

export interface ForecastHour {
  dateTime: string; // "2025-05-23T15:00:00"
  temperature: number;
  description: string;
  condition: WeatherCondition;
  icon: string;
}