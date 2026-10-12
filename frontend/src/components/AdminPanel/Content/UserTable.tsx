import { useUsers } from "@/hooks/useAdminPanel";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CustomTablePagination } from "../CustomTablePagination";
import { useAdminPanelContext } from "@/contexts/AdminPanelContext";
import { RegisterUserDialog } from "../UserForm/RegisterUserDialog";
import { EditUserDialog } from "../UserForm/EditUserDialog";
import { DeleteUserDialog } from "../UserForm/DeleteUserDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

export function UserTable() {
  const { data, page, limit, pagination, setPage, setLimit } = useUsers();
  const { setRegisterOpen, setEditOpen, setDeleteOpen } = useAdminPanelContext();

  return (
    <>
      <Box position={"absolute"}>
        <Button variant="contained" onClick={() => setRegisterOpen(true)}>
          <PersonAddAltIcon />
          <Typography marginLeft={1} variant="caption">
            Tambah User
          </Typography>
        </Button>
      </Box>
      <Box sx={{ width: "100%", pt: "53px" }}>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#FFcc00", textAlign: "center" }}>No</TableCell>
                <TableCell sx={{ color: "#FFcc00", textAlign: "center" }}>Username</TableCell>
                <TableCell sx={{ color: "#FFcc00", textAlign: "center" }}>Role</TableCell>
                <TableCell sx={{ color: "#FFcc00", textAlign: "center" }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((u, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ color: "#FFF", textAlign: "center" }}>{i + 1}</TableCell>
                  <TableCell sx={{ color: "#FFF", textAlign: "center" }}>{u.username}</TableCell>
                  <TableCell sx={{ color: "#FFF", textAlign: "center" }}>{u.role}</TableCell>
                  <TableCell sx={{ color: "#FFF", textAlign: "center", gap: "2px" }}>
                    <IconButton sx={{ color: "#219EBC" }} onClick={() => setEditOpen(u)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#FB8500" }} onClick={() => setDeleteOpen(u)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {pagination && <CustomTablePagination page={page} limit={limit} total={pagination.total} onPageChange={setPage} onLimitChange={setLimit} />}
      <RegisterUserDialog />
      <EditUserDialog />
      <DeleteUserDialog />
    </>
  );
}
