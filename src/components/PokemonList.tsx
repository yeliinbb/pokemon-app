"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Pokemon } from "@/types/types";
import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
import Link from "next/link";

const PokemonList = () => {
  // const router = useRouter();

  const {
    data: pokemons,
    isPending,
    error,
    isSuccess,
  } = useQuery<Pokemon[], AxiosError, Pokemon[], [string]>({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const { data } = await axios.get("/api/pokemons");
      // console.log("data", data);
      return data;
    },
  });
  // console.log("pokemons => ", pokemons);
  // if (isSuccess) {
  //   const {name } = pokemons;
  // }

  if (isPending) {
    return (
      <div className="text-lg text-center font-medium">로딩중입니다...</div>
    );
  }

  if (error) {
    return (
      <div className="text-lg text-center font-medium">
        에러가 발생했습니다: {error.message}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-item-cards auto-rows-[200px] w-[100%] height-[100%] gap-4">
      {isSuccess &&
        pokemons.map((pokemon, index) => (
          <Link href={`/pokemon/${pokemon.id}`} key={index}>
            <li className="flex flex-col items-center justify-center border-solid border-[1px] border-whitesmoke rounded-lg cursor-pointer hover:shadow-custom h-[200px]">
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
                priority={true}
              />
              <div className="flex flex-col">
                <span>{pokemon.korean_name}</span>
                <span>도감번호 : {pokemon.id}</span>
              </div>
            </li>
          </Link>
        ))}
    </ul>
  );
};

export default PokemonList;
