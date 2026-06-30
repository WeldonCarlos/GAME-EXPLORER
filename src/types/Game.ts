export interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;

  description_raw?: string;

  platforms?: {
    platform: {
      id: number;
      name: string;
    };
  }[];
}