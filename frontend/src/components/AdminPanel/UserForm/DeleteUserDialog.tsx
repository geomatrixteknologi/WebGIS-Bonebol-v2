/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, CircularProgress } from "@mui/material";
import { useAdminPanelContext } from "@/contexts/AdminPanelContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

export function DeleteUserDialog() {
  const { deleteOpen, setDeleteOpen, refreshUserTable } = useAdminPanelContext();
  const [loading, setLoading] = useState(false);

  if (!deleteOpen) return null;

  const handleClose = () => {
    if (loading) return;
    setDeleteOpen(null);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/delete/userbyid`, {
        params: { userid: deleteOpen.id },
        withCredentials: true,
      });

      toast.success("User berhasil dihapus");

      setDeleteOpen(null);

      refreshUserTable();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gagal menghapus user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Hapus User</DialogTitle>
      <Divider />

      <DialogContent>
        Apakah kamu yakin ingin menghapus user <strong>{deleteOpen.username}</strong> ini?
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Batal
        </Button>

        <Button color="error" variant="contained" onClick={handleDelete} disabled={loading} startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}>
          {loading ? "Menghapus..." : "Hapus"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
