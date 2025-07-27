import { Link } from "@tanstack/react-router";
import { Button, Chip, Avatar, Box } from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import TanstackTable from "../common/components/TanstackTable";
import type { Character } from "../types";

const columnHelper = createColumnHelper<Character>();

interface CharactersTableProps {
  characters: Character[];
  isLoading?: boolean;
  error?: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const CharactersTable: React.FC<CharactersTableProps> = ({
  characters,
  isLoading,
  error,
}) => {
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

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
      size: 80,
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <Avatar
          src={info.getValue()}
          alt="Character"
          sx={{ width: 50, height: 50 }}
        />
      ),
      size: 100,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <Box sx={{ fontWeight: "bold" }}>{info.getValue()}</Box>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Chip
          label={info.getValue()}
          color={getStatusColor(info.getValue())}
          size="small"
        />
      ),
    }),
    columnHelper.accessor("species", {
      header: "Species",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gender", {
      header: "Gender",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("location.name", {
      header: "Location",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("id", {
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <Link
          to="/character/$characterId"
          params={{ characterId: info.getValue().toString() }}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
          >
            View
          </Button>
        </Link>
      ),
    }),
  ];

  return (
    <TanstackTable
      data={characters}
      columns={columns}
      isLoading={isLoading}
      error={error}
      title="Characters List"
      searchPlaceholder="Search characters..."
      searchKey="name"
      emptyMessage="No characters found"
    />
  );
};
