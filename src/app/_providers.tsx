"use client";

import React, { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 전체 provider 관리 컴포넌트
const Providers = ({ children }: PropsWithChildren) => {
  // useState안에 콜백 함수로 넣어줄 경우
  // 컴포넌트가 처음에 마운트될 때만 초기값이 세팅되고 이후에는 리렌더링 되지 않는다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
