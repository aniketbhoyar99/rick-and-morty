import React from "react";
import { useParams, Link } from "@tanstack/react-router";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useCharacter } from "../services/queries/characters";
import CustomLoader from "../common/components/CustomLoader";

export const CharacterDetail: React.FC = () => {
  const { characterId } = useParams({ from: "/character/$characterId" });
  const {
    data: character,
    isLoading,
    error,
  } = useCharacter(parseInt(characterId));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "success";
      case "Dead":
        return "error";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  if (error || !character) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {(error as Error)?.message || "Character not found"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Back to Characters
      </Button>

      <Card>
        <Grid container>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="400"
              image={character.image}
              alt={character.name}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {character.name}
              </Typography>

              <Box display="flex" gap={1} mb={3}>
                <Chip
                  label={character.status}
                  color={getStatusColor(character.status)}
                  size="medium"
                />
                <Chip
                  label={character.species}
                  variant="outlined"
                  size="medium"
                />
                {character.type && (
                  <Chip
                    label={character.type}
                    variant="outlined"
                    size="medium"
                  />
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Origin
                    </Typography>
                    <Typography variant="body1">
                      {character.origin.name}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {character.location.name}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Gender
                    </Typography>
                    <Typography variant="body1">{character.gender}</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Episodes
                    </Typography>
                    <Typography variant="body1">
                      {character.episode.length} episodes
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
