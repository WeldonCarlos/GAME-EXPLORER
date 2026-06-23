import axios from "axios";
import type { Game } from "../types/Game";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function getGames(page: number): Promise<Game[]> {
  const response = await axios.get<{ results: Game[] }>(
    `${BASE_URL}/games`,
    {
      params: {
        key: API_KEY,
        page,
        page_size: 8,
      },
    }
  );

  return response.data.results;
}