import PokemonList from "@/app/(pokemons)/_components/PokemonList";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-screen flex flex-col flex-1 items-center p-6 gap-2 overflow-auto">
      <h1 className="text-2xl font-bold">포켓몬 도감</h1>
      <PokemonList />
    </div>
  );
};

export default HomePage;
