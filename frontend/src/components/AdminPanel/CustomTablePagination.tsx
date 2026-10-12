import { TablePagination } from "@mui/material";

interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function CustomTablePagination({ page, limit, total, onPageChange, onLimitChange }: Props) {
  return (
    <TablePagination
      component="div"
      count={total}
      page={page - 1}
      rowsPerPage={limit}
      onPageChange={(_, newPage) => onPageChange(newPage + 1)}
      onRowsPerPageChange={(e) => {
        onLimitChange(Number(e.target.value));
        onPageChange(1);
      }}
      rowsPerPageOptions={[5, 10, 25, 50]}
      labelRowsPerPage="Show:"
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
      sx={{
        ".MuiTablePagination-toolbar": {
          px: 2,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          color: "#FFF",
        },
        ".MuiTablePagination-spacer": { display: "none" },
        ".MuiTablePagination-selectLabel": { margin: 0 },
        ".MuiTablePagination-displayedRows": { margin: 0 },
        ".MuiTablePagination-actions button": { color: "#FFF" },
        ".MuiTablePagination-selectIcon": { color: "#FFF" },
      }}
    />
  );
}
