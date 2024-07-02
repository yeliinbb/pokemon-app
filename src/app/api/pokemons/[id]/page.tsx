import { DetailPageProps } from "@/types/types";
import React from "react";

export function generateMetadata({ params }: DetailPageProps) {
  return {
    title: `Detail 페이지 : ${params.id}`,
    description: `Detail 페이지 : ${params.id}`,
  };
}

const page = ({ params }: DetailPageProps) => {
  return <div>Detail page : {params.id}</div>;
};

export default page;
