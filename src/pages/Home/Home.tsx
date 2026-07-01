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
    const [inputSearch, setInputSearch] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadGames() {
            try {
                setLoading(true);

                const data = await getGames(page, search);

                setGames(data);
            } catch (error) {
                console.error(error);
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

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        mb: 4,
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        alignItems: "stretch",
                    }}
                >
                    <TextField
                        fullWidth
                        label="Buscar jogo..."
                        variant="outlined"
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setPage(1);
                                setSearch(inputSearch);
                            }
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#1f1f1f",
                                borderRadius: 2,

                                "& fieldset": {
                                    borderColor: "#444",
                                },

                                "&:hover fieldset": {
                                    borderColor: "#777",
                                },

                                "&.Mui-focused fieldset": {
                                    borderColor: "#1976d2",
                                },
                            },

                            "& .MuiInputLabel-root": {
                                color: "#aaa",
                            },

                            "& .MuiInputBase-input": {
                                color: "#fff",
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                            setPage(1);
                            setSearch(inputSearch);
                        }}
                        sx={{
                            minWidth: {
                                xs: "100%",
                                sm: 150,
                            },
                            borderRadius: 2,
                            fontWeight: "bold",
                            textTransform: "none",
                        }}
                    >
                        Buscar
                    </Button>
                </Box>
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
                          <GameCard game={game} />
                        </Grid>
                    ))}
                </Grid>

                {/* PAGINAÇÃO */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                        mt: 8,
                        mb: 8,
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        sx={{
                            px: 4,
                            py: 1.2,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: "bold",
                            backgroundColor: "#1f80e0",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#2b2b2b",
                                color: "#777",
                            },
                        }}
                    >
                        ← Anterior
                    </Button>

                    <Box
                        sx={{
                            px: 3,
                            py: 1.2,
                            borderRadius: 3,
                            backgroundColor: "#1c1c1c",
                            border: "1px solid #333",
                            minWidth: 130,
                            textAlign: "center",
                        }}
                    >
                        <Typography fontWeight="bold">
                            Página {page}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={() => setPage((prev) => prev + 1)}
                        sx={{
                            px: 4,
                            py: 1.2,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: "bold",
                            backgroundColor: "#1f80e0",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                    >
                        Próxima →
                    </Button>
                </Box>
            </Container>
        </>
    );
}