import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'city-search-bar',
  standalone: true,
  templateUrl: './city-search-bar.component.html',
  styleUrls: ['./city-search-bar.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CitySearchBarComponent {
  searchTerm = '';
  suggestions: { name: string, lat: number, lon: number, country: string }[] = [];
  loading = false;
  @Output() citySelected = new EventEmitter<{ name: string, lat: number, lon: number }>();

  constructor(private http: HttpClient) {}

  onSearchChange() {
    if (this.searchTerm.length < 3) {
      this.suggestions = [];
      return;
    }
    this.loading = true;
    // Usando Open-Meteo Geocoding API (não precisa de chave)
    this.http.get<any>('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: this.searchTerm,
        count: 5,
        language: 'pt',
        format: 'json'
      }
    }).subscribe({
      next: (res) => {
        this.suggestions = res.results?.map((r: any) => ({
          name: `${r.name}${r.admin1 ? ', ' + r.admin1 : ''} (${r.country_code})`,
          lat: r.latitude,
          lon: r.longitude,
          country: r.country
        })) || [];
        this.loading = false;
      },
      error: () => {
        this.suggestions = [];
        this.loading = false;
      }
    });
  }

  selectSuggestion(suggestion: { name: string, lat: number, lon: number }) {
    this.citySelected.emit(suggestion);
    this.searchTerm = '';
    this.suggestions = [];
  }
}