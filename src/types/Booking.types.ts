export interface Planet {
  aroundPlanet: any;
  id: string;
  name: string;
  englishName: string;
  isPlanet: boolean;
  moons: any[] | null;
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  avgTemp: number;
}
