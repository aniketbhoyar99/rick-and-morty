import type { ApiResponse, Character } from "../../types";
import { api } from "../api";

export const getCharacters = async (
  page: number = 1
): Promise<ApiResponse<Character>> => {
  const response = await api.get(`/character?page=${page}`);
  return response.data;
};

export const getCharacter = async (id: number): Promise<Character> => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};
