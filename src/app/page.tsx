import PokemonList from "@/components/PokemonList";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-black text-whitesmoke w-screen flex flex-col items-center p-6 gap-2">
      <h1 className="text-2xl font-bold">포켓몬 도감</h1>
      <section className="w-[100%] h-[100%] p-6">
        <PokemonList />
      </section>
    </div>
  );
};

export default HomePage;
