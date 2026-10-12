/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Divider, CircularProgress } from "@mui/material";
import { useAdminPanelContext } from "@/contexts/AdminPanelContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserForm, editUserSchema } from "@/schemas/Zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export function EditUserDialog() {
  const { editOpen, setEditOpen, refreshUserTable } = useAdminPanelContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (editOpen) {
      reset({
        username: editOpen.username,
        password: "",
      });
    }
  }, [editOpen, reset]);

  const onSubmit = async (data: EditUserForm) => {
    if (!editOpen) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/auth/update`,
        {
          userId: editOpen.id,
          newUsername: data.username,
          newPassword: data.password || undefined,
        },
        { withCredentials: true }
      );

      toast.success("User berhasil diperbarui");

      setEditOpen(null);
      reset();
      refreshUserTable();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gagal memperbarui user");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Dialog open={!!editOpen} onClose={() => setEditOpen(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <Divider />

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Controller name="username" control={control} render={({ field }) => <TextField {...field} label="Username" error={!!errors.username} helperText={errors.username?.message} required />} />

          <Controller
            name="password"
            control={control}
            render={({ field }) => <TextField {...field} type="password" label="Password (opsional)" error={!!errors.password} helperText={errors.password?.message || "Kosongkan jika tidak ingin mengganti"} />}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(null)}>Batal</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={!isValid || !isDirty || isSubmitting} startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}>
            {isSubmitting ? "Proses..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
