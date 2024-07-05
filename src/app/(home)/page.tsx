import React, { Suspense } from "react"

import PokemonList from "@/app/(pokemons)/_components/PokemonList"

import HomePageLoading from "./loading"

const HomePage = () => {
  return (
    <div className="flex w-screen flex-1 flex-col items-center gap-2 overflow-auto p-6">
      <h1 className="text-2xl font-bold">포켓몬 도감</h1>
      {/* {PokemonList가 서버 컴포넌트가 아니라 클라이언트 컴포넌트이기 때문에 프로그램에서 loading 상태를 파악할 수 없다. 따라서 사용 불가} */}
      <Suspense fallback={<HomePageLoading />}>
        <PokemonList />
      </Suspense>
    </div>
  )
}

export default HomePage
