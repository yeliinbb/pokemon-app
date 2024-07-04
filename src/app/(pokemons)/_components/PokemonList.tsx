"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Pokemon } from "@/types/types";
import { AxiosError } from "axios";
import Link from "next/link";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 20;

const PokemonList = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, error, isSuccess } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () => {
      const response = await axios.get("/api/pokemons", {
        params: {
          page: page,
          limit: ITEMS_PER_PAGE,
        },
      });
      // console.log("data", data);
      return {
        pokemons: response.data,
        totalPages: response.data.totalPages,
        hasNextPage: response.data.hasNextPage,
      };
    },
  });

  console.log("data", data);

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
    <section className="w-[100%] h-[100%] p-6">
      <ul className="grid grid-cols-item-cards auto-rows-[200px] w-[100%] height-[100%] gap-4 min-h-[870px]">
        {isSuccess &&
          data.pokemons?.data?.map((pokemon, index) => (
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
      <Pagination page={page} setPage={setPage} totalPages={data.totalPages} />
    </section>
  );
};

export default PokemonList;
