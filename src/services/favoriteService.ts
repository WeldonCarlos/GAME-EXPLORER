import type { Game } from "../types/Game";

const STORAGE_KEY = "game-explorer:favorites";

export function getFavorites(): Game[] {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

export function saveFavorites(games: Game[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}