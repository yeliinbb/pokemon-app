import { DetailPageProps, Pokemon } from "@/types/types";
import React from "react";

import PokemonDetail from "@/components/PokemonDetail";
import { fetchPokemon } from "@/lib/fetchPokemon";

export function generateMetadata({ params }: DetailPageProps) {
  return {
    title: `Detail 페이지 : ${params.id}`,
    description: `Detail 페이지 : ${params.id}`,
  };
}

const DetailPage = async ({ params }: DetailPageProps) => {
  const { id } = params;
  const pokemon: Pokemon = await fetchPokemon(id);
  console.log("pokemon => ", pokemon);

  return (
    <section className="w-full h-full flex items-center justify-center ">
      <PokemonDetail id={id} />
    </section>
  );
};

export default DetailPage;
