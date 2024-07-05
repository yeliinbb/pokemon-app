"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { FaHeart, FaRegHeart } from "react-icons/fa"

import { PokemonWithLike } from "@/types/types"

import Pagination from "./Pagination"
import SkeletonMainPage from "./SkeletonMainPage"

const ITEMS_PER_PAGE = 20

type QueryData = {
  pokemons: PokemonWithLike[]
  totalPages: number
  hasNextPage: boolean
}

type MutationVariables = {
  id: number
  currentLiked?: boolean
}

type MutationContext = {
  previousData: QueryData | undefined
}

const PokemonList = () => {
  const [page, setPage] = useState<number>(1)
  const queryClient = useQueryClient()

  const { data, isPending, error, isSuccess } = useQuery<
    QueryData,
    AxiosError,
    QueryData,
    [string, number]
  >({
    queryKey: ["pokemons", page],
    queryFn: async () => {
      const response = await axios.get("/api/pokemons", {
        params: {
          page: page,
          limit: ITEMS_PER_PAGE,
        },
      })
      console.log("response", response)
      const datas = response.data.data
      // 받아온 데이터는 모두가 사용하는 데이터이기 때문에 이렇게 가공을 하지 않는 것이 좋음.
      // 필요 시 다른 리스트를 만들어서 관리해주는 것이 필요.
      const newDatas: PokemonWithLike[] = datas.map((item: PokemonWithLike) => {
        return item ? { ...item, liked: false } : undefined
      })
      return {
        pokemons: newDatas,
        totalPages: response.data.totalPages,
        hasNextPage: response.data.hasNextPage,
      }
    },
    staleTime: 10000000,
  })

  const likeMutation: UseMutationResult<
    void, // mutateFn에서 반환하는 data type
    AxiosError, // TError
    MutationVariables, // TVariables
    MutationContext // TContext
  > = useMutation({
    mutationFn: async ({ id, currentLiked }: MutationVariables) => {
      // like 기능 구현 시, 해당 데이터만 업데이트해주는 것이기 때문에 put 덮어주기 사용 권장
      // liked된 데이터를 저장해주는 공간 필요 -> 로컬 스토리지 or supabase 사용해서 저장 기능 구현 시도
      // 현재 이 로직은 작동하고 있지 않음 -> 따로 변경된 데이터를 저장해주고 있지 않기 때문에
      // await axios.get(`/api/pokemons/${id}`, {
      //   params: { liked: !currentLiked },
      // })
      // 이런 식으로 쿼리스트링으로 보내는 방법도 있음.
      // const newLikedState = !currentLiked ? 'true' : 'false';
      // await axios.get(`/api/pokemons/${id}/liked=${newLikedState}`)
    },
    onMutate: async ({ id }: MutationVariables): Promise<MutationContext> => {
      await queryClient.cancelQueries({ queryKey: ["pokemons", page] })
      const previousData = queryClient.getQueryData<QueryData>([
        "pokemons",
        page,
      ])
      console.log("previousData", previousData)
      if (previousData) {
        const updatedPokemons: PokemonWithLike[] = previousData.pokemons.map(
          (pokemon) =>
            pokemon.id === id ? { ...pokemon, liked: !pokemon.liked } : pokemon
        )
        queryClient.setQueryData<QueryData>(["pokemons", page], {
          ...previousData,
          pokemons: updatedPokemons,
        })
      }

      return { previousData }
    },
    onError: (
      error: AxiosError,
      variables: MutationVariables,
      context?: MutationContext
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(["pokemons", page], context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemons", page] })
    },
  })

  const handleLike = async ({ id, currentLiked }: MutationVariables) => {
    likeMutation.mutate({ id, currentLiked })
  }

  // console.log("data", data)

  if (isPending) {
    return <SkeletonMainPage />
  }

  if (error) {
    return (
      <div className="text-center text-lg font-medium">
        에러가 발생했습니다: {error.message}
      </div>
    )
  }

  return (
    <section className="h-[100%] w-[100%] p-6">
      <ul className="height-[100%] grid min-h-[870px] w-[100%] auto-rows-[200px] grid-cols-item-cards gap-4">
        {isSuccess &&
          data.pokemons?.map((pokemon, index) => (
            <li
              key={index}
              className="flex h-[200px] flex-col items-center justify-center rounded-lg border-[1px] border-solid border-whitesmoke hover:shadow-custom"
            >
              <Link href={`/pokemon/${pokemon.id}`}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  priority={true}
                  className="cursor-pointer"
                />
              </Link>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span>{pokemon.korean_name}</span>
                  {pokemon.liked ? (
                    <FaHeart
                      onClick={() =>
                        handleLike({
                          id: pokemon.id,
                          currentLiked: pokemon.liked,
                        })
                      }
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() =>
                        handleLike({
                          id: pokemon.id,
                          currentLiked: pokemon.liked,
                        })
                      }
                      className="h-[18px] w-[18px] cursor-pointer"
                    />
                  )}
                </div>
                <span>도감번호 : {pokemon.id}</span>
              </div>
            </li>
          ))}
      </ul>
      {isSuccess && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data.totalPages}
        />
      )}
    </section>
  )
}

export default PokemonList
