import PokemonList from "@/components/PokemonList";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-screen flex flex-col flex-1 items-center p-6 gap-2 overflow-auto">
      <h1 className="text-2xl font-bold">포켓몬 도감</h1>
      <section className="w-[100%] h-[100%] p-6">
        <PokemonList />
      </section>
    </div>
  );
};

export default HomePage;
