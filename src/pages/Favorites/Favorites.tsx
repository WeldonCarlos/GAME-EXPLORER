import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import type { Game } from "../../types/Game";

import { getFavorites } from "../../utils/favoriteStorage";
import { GameCard } from "../../components/GameCard/GameCard";

export function Favorites() {
  const [favorites, setFavorites] = useState<Game[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <Container sx={{ mt: 5, mb: 8 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
      >
        ❤️ Meus Favoritos
      </Typography>

      {favorites.length === 0 ? (
        <Box
          sx={{
            mt: 10,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
          >
            Você ainda não possui jogos favoritos.
          </Typography>

          <Typography color="text.secondary">
            Adicione alguns jogos na página inicial.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((game) => (
            <Grid
              key={game.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}