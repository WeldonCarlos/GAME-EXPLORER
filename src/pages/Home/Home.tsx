import { useEffect, useState } from "react";
import { Container, Typography, Grid, Button, Stack } from "@mui/material";
import { getGames } from "../../services/gameService";
import type { Game } from "../../types/Game";
import { GameCard } from "../../components/GameCard/GameCard";

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadGames() {
      const data = await getGames(page);
      setGames(data);
    }

    loadGames();
  }, [page]);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Jogos em Destaque
      </Typography>

      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item key={game.id} xs={12} sm={6} md={4}>
            <GameCard
              name={game.name}
              image={game.background_image}
              released={game.released}
            />
          </Grid>
        ))}
      </Grid>

      {/* PAGINAÇÃO */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        <Typography sx={{ display: "flex", alignItems: "center" }}>
          Página {page}
        </Typography>

        <Button
          variant="contained"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
}