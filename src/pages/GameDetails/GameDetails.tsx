import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Link,
  Divider,
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
    <Container maxWidth="lg" sx={{ py: 5 }}>

      <Box
        component="img"
        src={game.background_image}
        alt={game.name}
        sx={{
          width: "100%",
          maxHeight: 500,
          objectFit: "cover",
          borderRadius: 4,
          mb: 4,
        }}
      />

      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
        {game.name}
      </Typography>

      {/* INFO (Stack → Box) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mb: 4,
        }}
      >
        <Typography variant="h6">
          📅 Lançamento: {game.released}
        </Typography>

        <Typography variant="h6">
          ⭐ Nota: {game.rating}
        </Typography>

        {game.metacritic_platforms?.length && (
          <Typography variant="h6">
            🏆 Metacritic: {game.metacritic_platforms[0].metascore}
          </Typography>
        )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* GÊNEROS */}
      <Typography variant="h5" gutterBottom>
        🎮 Gêneros
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 4,
        }}
      >
        {game.genres?.map((genre) => (
          <Chip key={genre.id} label={genre.name} color="primary" />
        ))}
      </Box>

      {/* DESENVOLVEDORAS */}
      <Typography variant="h5" gutterBottom>
        🏢 Desenvolvedoras
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 4,
        }}
      >
        {game.developers?.map((developer) => (
          <Chip key={developer.id} label={developer.name} color="secondary" />
        ))}
      </Box>

      {/* PUBLISHERS */}
      <Typography variant="h5" gutterBottom>
        📦 Publishers
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 4,
        }}
      >
        {game.publishers?.map((publisher) => (
          <Chip key={publisher.id} label={publisher.name} variant="outlined" />
        ))}
      </Box>

      {/* WEBSITE */}
      {game.website && (
        <>
          <Typography variant="h5" gutterBottom>
            🌐 Website Oficial
          </Typography>

          <Link
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {game.website}
          </Link>

          <Divider sx={{ my: 4 }} />
        </>
      )}

      {/* DESCRIÇÃO */}
      <Typography variant="h5" gutterBottom>
        📖 Descrição
      </Typography>

      <Typography
        sx={{
          mb: 5,
          lineHeight: 1.8,
          textAlign: "justify",
        }}
      >
        {game.description_raw}
      </Typography>

      {/* PLATAFORMAS */}
      <Typography variant="h5" gutterBottom>
        🕹 Plataformas
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {game.platforms?.map((item) => (
          <Chip key={item.platform.id} label={item.platform.name} />
        ))}
      </Box>

    </Container>
  );
}