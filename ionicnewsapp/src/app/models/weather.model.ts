import { WeatherCondition } from '../types/weather-condition.enum';

export interface Weather {
  cityId: string;
  cityName: string;
  country: string;
  temperature: number;
  description: string;
  condition: WeatherCondition;
  icon: string;
  humidity: number;
  windSpeed: number;
  date: string; // ISO
  timestamp: number;
}