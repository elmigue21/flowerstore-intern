import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCharacters = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${pageParam}`
  );
  return res.data;
};

export function useCharactersInfiniteQuery(search: string) {
  return useInfiniteQuery({
    queryKey: ["characters", search],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${pageParam}&name=${search}`)
        .then((res) => res.data),

    getNextPageParam: (lastPage) => {
      if (lastPage.info?.next) {
        const url = new URL(lastPage.info.next);
        const page = url.searchParams.get("page");
        return page ? Number(page) : undefined;
      }
      return undefined;
    },

    initialPageParam: 1, 
  });
}
