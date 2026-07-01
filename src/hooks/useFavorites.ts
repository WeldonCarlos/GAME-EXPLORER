import { useEffect, useState } from "react";
import type { Game } from "../types/Game";
import {
  getFavorites,
  saveFavorites,
} from "../services/favoriteService";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Game[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function isFavorite(id: number) {
    return favorites.some((game) => game.id === id);
  }

  function toggleFavorite(game: Game) {
    let updatedFavorites: Game[];

    if (isFavorite(game.id)) {
      updatedFavorites = favorites.filter(
        (item) => item.id !== game.id
      );
    } else {
      updatedFavorites = [...favorites, game];
    }

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}