import { PokemonWithLike } from "@/types/types"

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const fetchPokemon = async (id: string): Promise<PokemonWithLike> => {
  const response = await fetch(`${apiUrl}/api/pokemons/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await response.json()
  console.log("fetchPokemon => ", data)
  return data
}
