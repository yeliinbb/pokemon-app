import React from "react"
import Skeleton from "react-loading-skeleton"

import "react-loading-skeleton/dist/skeleton.css"

const SkeletonMainPage = () => {
  return (
    <section className="h-[100%] w-[100%] p-6">
      {/* {List ui} */}
      <ul className="height-[100%] grid min-h-[870px] w-[100%] auto-rows-[200px] grid-cols-item-cards gap-4">
        {[...Array(20)].map((_, index) => (
          <li
            key={index}
            className="flex h-[200px] flex-col items-center justify-center rounded-lg border-[1px] border-solid border-whitesmoke hover:shadow-custom"
          >
            <Skeleton width={77} height={90} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Skeleton width={77} height={24}></Skeleton>
              </div>
              <Skeleton width={77} height={24}></Skeleton>
            </div>
          </li>
        ))}
      </ul>
      {/* {Pagination ui} */}
      <div className="mt-4 flex justify-center gap-3">
        <Skeleton width={57} height={32}></Skeleton>
        {[...Array(8)].map((_, index) => {
          return <Skeleton key={index + 1} width={30} height={32}></Skeleton>
        })}
        <Skeleton width={57} height={32}></Skeleton>
      </div>
    </section>
  )
}

export default SkeletonMainPage
