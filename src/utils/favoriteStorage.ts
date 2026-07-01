import type { Game } from "../types/Game";

const STORAGE_KEY = "favorite-games";

export function getFavorites(): Game[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function isFavorite(id: number): boolean {
  return getFavorites().some((game) => game.id === id);
}

export function addFavorite(game: Game): void {
  const favorites = getFavorites();

  const alreadyExists = favorites.some(
    (favorite) => favorite.id === game.id
  );

  if (alreadyExists) {
    return;
  }

  favorites.push(game);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites)
  );
}

export function removeFavorite(id: number): void {
  const favorites = getFavorites().filter(
    (game) => game.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites)
  );
}

export function toggleFavorite(game: Game): void {
  if (isFavorite(game.id)) {
    removeFavorite(game.id);
    return;
  }

  addFavorite(game);
}