import { useState } from "react";

import { IconButton, Tooltip } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import type { Game } from "../../types/Game";

import {
  isFavorite,
  toggleFavorite,
} from "../../utils/favoriteStorage";

interface FavoriteButtonProps {
  game: Game;
}

export function FavoriteButton({
  game,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(
    isFavorite(game.id)
  );

  function handleFavorite(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();

    toggleFavorite(game);

    setFavorite(!favorite);
  }

  return (
    <Tooltip
      title={
        favorite
          ? "Remover dos favoritos"
          : "Adicionar aos favoritos"
      }
    >
      <IconButton
        onClick={handleFavorite}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "rgba(0,0,0,.65)",
          backdropFilter: "blur(8px)",
          color: favorite ? "#ff4d6d" : "#ffffff",

          "&:hover": {
            backgroundColor: "rgba(0,0,0,.85)",
            transform: "scale(1.08)",
          },

          transition: ".25s",
          zIndex: 2,
        }}
      >
        {favorite ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}