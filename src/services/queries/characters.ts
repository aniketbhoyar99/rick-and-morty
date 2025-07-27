import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse, Character } from "../../types";
import { getCharacter, getCharacters } from "../requests/characters";

export const useCharacters = (page: number = 1) => {
  return useQuery<ApiResponse<Character>>({
    queryKey: ["characters", "list", page],
    queryFn: () => getCharacters(page),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export const useCharacter = (id: number) => {
  return useQuery<Character>({
    queryKey: ["characters", "detail", id],
    queryFn: () => getCharacter(id),
    enabled: !!id,
  });
};

export const useRefreshCharacters = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (page: number) => getCharacters(page),
    onSuccess: (data, page) => {
      queryClient.setQueryData(["characters", "list", page], data);
    },
    onError: (error) => {
      console.error("Failed to refresh characters:", error);
    },
  });
};

export const useInvalidateCharacters = () => {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: ["characters"] }),
    invalidateList: () =>
      queryClient.invalidateQueries({ queryKey: ["characters", "list"] }),
    invalidateDetail: (id: number) =>
      queryClient.invalidateQueries({ queryKey: ["characters", "detail", id] }),
  };
};
