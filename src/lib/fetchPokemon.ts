import { Pokemon } from "@/types/types";

export const fetchPokemon = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`http://localhost:3002/api/pokemons/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  console.log("fetchPokemon => ", data);
  return data;
};
