import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Game } from "../../types/Game";

interface HeroBannerProps {
  game: Game;
}

export function HeroBanner({ game }: HeroBannerProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "70vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        px: 8,

        backgroundImage: `url(${game.background_image})`,
        backgroundSize: "cover",
       backgroundPosition: "top center"
      }}
    >
      {/* Overlay escuro */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background: `
            linear-gradient(
              90deg,
              rgba(0,0,0,.95) 0%,
              rgba(0,0,0,.75) 40%,
              rgba(0,0,0,.3) 70%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Conteúdo */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
        >
          {game.name}
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
        >
          Lançamento: {game.released}
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 4 }}
        >
          Nota: ⭐ {game.rating}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(`/game/${game.id}`)}
        >
          Ver Detalhes
        </Button>
      </Box>
    </Box>
  );
}