import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <div className="flex justify-center gap-3 mt-4">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="bg-[#ebebebf5] text-black rounded-md px-3 py-1 hover:bg-whitesmoke"
      >
        prev
      </button>
      {[...Array(totalPages)].map((_, index) => {
        return (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className="bg-[#ebebebf5] text-black rounded-md min-w-[30px] hover:bg-whitesmoke "
            style={{
              fontWeight: page === index + 1 ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="bg-[#ebebebf5] text-black rounded-md px-3 py-1 hover:bg-whitesmoke"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
