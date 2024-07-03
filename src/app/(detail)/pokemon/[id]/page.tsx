import { Pokemon } from "@/types/types";
import React from "react";

import PokemonDetail from "@/app/(pokemons)/_components/PokemonDetail";
import { fetchPokemon } from "@/lib/fetchPokemon";

interface DetailPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: DetailPageProps) {
  return {
    title: `Detail 페이지 : ${id}`,
    description: `Detail 페이지 : ${id}`,
  };
}

const DetailPage = async ({ params: { id } }: DetailPageProps) => {
  const pokemon: Pokemon = await fetchPokemon(id);
  console.log("pokemon => ", pokemon);

  return (
    <section className="w-full h-full flex items-center justify-center ">
      <PokemonDetail id={id} />
    </section>
  );
};

export default DetailPage;
