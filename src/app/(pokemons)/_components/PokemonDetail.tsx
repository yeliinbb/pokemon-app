"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { PokemonWithLike } from "@/types/types"

interface PokemonDetailProps {
  id: string
}

const PokemonDetail = ({ id }: PokemonDetailProps) => {
  const {
    data: pokemon,
    isPending,
    error,
    isSuccess,
  } = useQuery<PokemonWithLike, AxiosError, PokemonWithLike, [string, string]>({
    queryKey: ["pokemons", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/pokemons/${id}`)
      return data
    },
    enabled: !!id,
  })

  // console.log("pokemon => ", pokemon);

  if (isPending) {
    return (
      <div className="text-center text-lg font-medium">로딩중입니다...</div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-lg font-medium">
        에러가 발생했습니다: {error.message}
      </div>
    )
  }

  if (!isSuccess || !pokemon) {
    return null
  }

  return (
    <div className="m-auto flex h-fit w-[600px] flex-col items-center justify-center gap-5 rounded-lg bg-white pb-5 text-black">
      <div className="flex h-[100px] w-full flex-col items-center justify-center gap-2 rounded-t-lg bg-slate-200 p-3">
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
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold">타입 :</span>
          {pokemon.types.map((type, index) => (
            <div
              key={index}
              className="inline-block h-full min-w-[20px] place-items-center content-center rounded bg-[#FF7F50] p-1 text-center text-white"
            >
              {type.type.korean_name}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold">특성 :</span>
          <div className="flex items-center justify-center gap-2">
            {pokemon.abilities.map((ability, index) => (
              <div
                key={index}
                className="inline-block h-full min-w-[20px] content-center rounded bg-[#00BA55] p-1 text-center text-white"
              >
                {ability.ability.korean_name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <span className="font-bold">기술 :</span>
          <ul className="flex max-w-[500px] flex-wrap items-center justify-center gap-2">
            {pokemon.moves.map((move, index) => (
              <li className="w-fit" key={index}>
                {move.move.korean_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link href="/">
        <button className="h-full min-w-[60px] rounded-md bg-blue-500 px-4 py-2 text-center text-white">
          뒤로 가기
        </button>
      </Link>
    </div>
  )
}

export default PokemonDetail
