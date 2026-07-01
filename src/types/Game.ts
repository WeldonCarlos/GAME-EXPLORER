export interface ApiEntity {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Platform {
  id: number;
  name: string;
}

export interface GamePlatform {
  platform: Platform;
}

export interface MetacriticPlatform {
  metascore: number;

  url: string;

  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;

  description_raw?: string;

  website?: string;

  genres?: ApiEntity[];

  developers?: ApiEntity[];

  publishers?: ApiEntity[];

  metacritic_platforms?: MetacriticPlatform[];

  platforms?: GamePlatform[];
}