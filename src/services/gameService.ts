import axios from "axios";
import type { Game } from "../types/Game";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function getGames(
  page: number,
  search = ""
): Promise<Game[]> {

  const response = await axios.get<{ results: Game[] }>(
    `${BASE_URL}/games`,
    {
      params: {
        key: API_KEY,
        page,
        search,
       
      },
    }
  );

  return response.data.results;
}

export async function getGameById(id: string): Promise<Game> {
  const response = await axios.get<Game>(
    `${BASE_URL}/games/${id}`,
    {
      params: {
        key: API_KEY,
      },
    }
  );

  return response.data;
}