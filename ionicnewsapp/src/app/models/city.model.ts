export interface City {
  id: string; // Pode ser o nome ou um identificador composto ex: "sao-paulo,br"
  name: string;
  country: string;
  lat: number;
  lon: number;
}