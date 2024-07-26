import { fetchUsers } from "../services/users";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length < lastPage.totalPages) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    });

  return {
    users: data?.pages.flatMap((page) => page.users) ?? [],
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};

export { useUsers };
