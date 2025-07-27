import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Box, Button, Typography, Pagination } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { useNavigate, useParams, useLocation } from "@tanstack/react-router";
import { setCurrentPage } from "../store/charactersSlice";
import {
  useCharacters,
  useRefreshCharacters,
} from "../services/queries/characters";
import { CharactersTable } from "./CharactersTable";
import type { MainState } from "../types";
import type { AppDispatch } from "../store";

const CharactersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  let urlPage: number | undefined;
  try {
    const params = useParams({ from: "/page/$page" });
    urlPage = params.page;
  } catch {
    urlPage = location.pathname === "/" ? 1 : undefined;
  }

  const { currentPage } = useSelector((state: MainState) => state.characters);
  const activePage = urlPage || currentPage || 1;

  const { data, isLoading, error } = useCharacters(activePage);
  const refreshMutation = useRefreshCharacters();

  useEffect(() => {
    if (urlPage && urlPage !== currentPage) {
      dispatch(setCurrentPage(urlPage));
    } else if (!urlPage && currentPage && currentPage !== 1) {
      navigate({
        to: "/page/$page",
        params: { page: currentPage },
        replace: true,
      });
    }
  }, [urlPage, currentPage, dispatch, navigate]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));

    if (page === 1) {
      navigate({ to: "/" });
    } else {
      navigate({
        to: "/page/$page",
        params: { page },
        replace: true,
      });
    }
  };

  const handleRefresh = () => {
    refreshMutation.mutate(activePage);
  };

  const characters = data?.results || [];
  const totalPages = data?.info.pages || 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h2">
          Characters
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshMutation.isPending}
        >
          Refresh
        </Button>
      </Box>

      <CharactersTable
        characters={characters}
        isLoading={isLoading}
        error={error as Error}
        currentPage={activePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={activePage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default CharactersList;
