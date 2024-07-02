"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pokemon } from "@/types/types";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface PokemonDetailProps {
  id: string;
}

const PokemonDetail = ({ id }: PokemonDetailProps) => {
  const router = useRouter();

  const {
    data: pokemon,
    isPending,
    error,
    isSuccess,
  } = useQuery<Pokemon, AxiosError, Pokemon, [string, string]>({
    queryKey: ["pokemons", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/pokemons/${id}`);
      // console.log("data => ", data);
      return data;
    },
    enabled: !!id,
  });

  // console.log("pokemon => ", pokemon);

  if (isPending) {
    return (
      <div className="text-lg text-center font-medium ">로딩중입니다...</div>
    );
  }

  if (error) {
    return (
      <div className="text-lg text-center font-medium">
        에러가 발생했습니다: {error.message}
      </div>
    );
  }

  if (!isSuccess || !pokemon) {
    return null;
  }

  // const pokemonNumber = isSuccess ? toString(pokemon["id"]).padStart(4,"0") : "none";

  return (
    <div className="bg-white text-black flex flex-col items-center justify-center w-[600px] h-fit m-auto gap-5 pb-5 rounded-lg">
      <div className="flex flex-col justify-center items-center gap-2 bg-slate-200 w-full h-[100px] p-3 rounded-t-lg">
        <span className="text-xl font-bold">{pokemon.korean_name}</span>
        <span>{`No. ${pokemon["id"].toString().padStart(4, "0")}`}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={100}
          height={100}
          priority={true}
        />
        <span className="text-lg">{`이름 : ${pokemon.korean_name}`}</span>
        <span>{`키 : ${pokemon.height}m 무게 : ${pokemon.weight}kg`}</span>
        <div className="flex justify-center items-center gap-2">
          <span className="font-bold">타입 :</span>
          {pokemon.types.map((type, index) => (
            <div
              key={index}
              className="bg-[#FF7F50] min-w-[20px] text-center text-white p-1 rounded h-full inline-block content-center "
            >
              {type.type.korean_name}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="font-bold">특성 :</span>
          <div className="flex justify-center items-center gap-2">
            {pokemon.abilities.map((ability, index) => (
              <div
                key={index}
                className="bg-[#00BA55] min-w-[20px] text-center text-white p-1 rounded h-full inline-block content-center"
              >
                {ability.ability.korean_name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <span className="font-bold">기술 :</span>
          <ul className="max-w-[500px]  flex flex-wrap justify-center items-center gap-2 ">
            {pokemon.moves.map((move, index) => (
              <li className="w-fit" key={index}>
                {move.move.korean_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={() => router.back()}
        className="bg-blue-500 min-w-[60px] px-4 py-2 text-center text-white h-full rounded-md"
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default PokemonDetail;
