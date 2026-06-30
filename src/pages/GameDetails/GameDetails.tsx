import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";

import { getGameById } from "../../services/gameService";
import type { Game } from "../../types/Game";

export function GameDetails() {
  const { id } = useParams();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadGame() {
      try {
        setLoading(true);

        if (!id) return;

        const data = await getGameById(id);

        setGame(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!game) {
    return <Typography>Jogo não encontrado.</Typography>;
  }

  return (
    <Container sx={{ py: 5 }}>
      <Box
        component="img"
        src={game.background_image}
        alt={game.name}
        sx={{
          width: "100%",
          borderRadius: 4,
          mb: 4,
        }}
      />

      <Typography variant="h3" gutterBottom>
        {game.name}
      </Typography>

      <Typography variant="h6" color="text.secondary">
        Lançamento: {game.released}
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        ⭐ Nota: {game.rating}
      </Typography>

      <Typography sx={{ mb: 4 }}>
        {game.description_raw}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Plataformas
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {game.platforms?.map((item) => (
          <Chip
            key={item.platform.id}
            label={item.platform.name}
          />
        ))}
      </Stack>
    </Container>
  );
}