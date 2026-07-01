import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import type { Game } from "../../types/Game";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/game/${game.id}`)}
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        userSelect: "none",
        transition: "transform .25s ease, box-shadow .25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 10,
        },
      }}
    >
      <FavoriteButton game={game} />

      <CardMedia
        component="img"
        image={game.background_image}
        alt={game.name}
        height="220"
        draggable={false}
        loading="lazy"
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
            noWrap
          >
            {game.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Lançamento
          </Typography>

          <Typography variant="body1">
            {game.released || "Não informado"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}