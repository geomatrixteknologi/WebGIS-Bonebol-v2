/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Autocomplete, Divider, CircularProgress } from "@mui/material";
import { useAdminPanelContext, ROLE_OPTIONS } from "@/contexts/AdminPanelContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserForm, registerUserSchema } from "@/schemas/Zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export function RegisterUserDialog() {
  const { registerOpen, setRegisterOpen, refreshUserTable } = useAdminPanelContext();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      role: null,
    },
  });

  const roleValue = watch("role");

  const onSubmit = async (data: RegisterUserForm) => {
    if (!data.role) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/auth/register`,
        {
          username: data.username,
          password: data.password,
          role: data.role,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("User berhasil ditambahkan");
      setRegisterOpen(false);
      reset();
      refreshUserTable();
    } catch (error: any) {
      const message = error?.response?.data?.message || "Gagal menambahkan user";

      toast.error(message);
    }
  };

  const closeButton = () => {
    setRegisterOpen(false);
    reset();
  };

  return (
    <>
      <Toaster position="top-center" />
      <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Tambah User</DialogTitle>
        <Divider />

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Controller name="username" control={control} render={({ field }) => <TextField {...field} label="Username" error={!!errors.username} helperText={errors.username?.message} required />} />

          <Controller name="password" control={control} render={({ field }) => <TextField {...field} type="password" label="Password" error={!!errors.password} helperText={errors.password?.message} required />} />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={ROLE_OPTIONS}
                value={field.value}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => <TextField {...params} label="Role" error={!!errors.role} helperText={errors.role?.message} required />}
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeButton}>Batal</Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={!isValid || !roleValue || isSubmitting} startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null} variant="contained">
            {isSubmitting ? "Proses..." : "Daftar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
