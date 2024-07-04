"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Pokemon } from "@/types/types";
import { AxiosError } from "axios";
import Link from "next/link";

const ITEMS_PER_PAGE = 20;

const PokemonList = () => {
  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      console.log("pageParam", pageParam);
      const response = await axios.get("/api/pokemons", {
        params: { _page: pageParam, _limit: ITEMS_PER_PAGE },
      });
      console.log("API response", response.data);
      return {
        pokemons: response.data,
        totalPages: response.data.totalPages,
      };
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      // console.log("nextPage", nextPage);
      // console.log("lastPage.totalPages", lastPage.totalPages);
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    select: ({ pages }) => {
      // console.log("pages", pages);
      const finalData = pages
        .map((pokemonsPerPage) => pokemonsPerPage.pokemons.data)
        .flat(Infinity);
      // console.log("finalData", finalData);
      return finalData;
    },
  });

  // console.log("pokemons", pokemons);

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
    <>
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
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "로딩중..." : "더보기"}
          </button>
        )}
      </ul>
    </>
  );
};

export default PokemonList;
