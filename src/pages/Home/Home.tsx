import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Grid,
    Button,
    Stack,
    CircularProgress,
    Box,
} from "@mui/material";

import { TextField } from "@mui/material";
import { getGames } from "../../services/gameService";
import type { Game } from "../../types/Game";

import { GameCard } from "../../components/GameCard/GameCard";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";

export function Home() {
    const [games, setGames] = useState<Game[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadGames() {
            try {
                setLoading(true);

                const data = await getGames(page, search);

                setGames(data);
            } catch (error) {
                console.error("Erro ao carregar jogos:", error);
            } finally {
                setLoading(false);
            }
        }

        loadGames();
    }, [page, search]);
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
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <>
            {/* HERO */}
            {games.length > 0 && <HeroBanner game={games[0]} />}

            {/* LISTAGEM */}
            <Container sx={{ mt: 6 }}>

                <TextField
                    fullWidth
                    label="Buscar jogo..."
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        mb: 4,
                        input: { color: "white" },
                    }}
                />
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        mb: 4,
                    }}
                >
                    Jogos Recomendados
                </Typography>

                <Grid container spacing={3}>
                    {games.map((game) => (
                        <Grid
                            key={game.id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <GameCard
                                id={game.id}
                                name={game.name}
                                image={game.background_image}
                                released={game.released}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* PAGINAÇÃO */}
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    mt={6}
                    mb={4}
                >
                    <Button
                        variant="contained"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Prev
                    </Button>

                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
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
        </>
    );
}