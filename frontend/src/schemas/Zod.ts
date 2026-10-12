import { ROLE_OPTIONS } from "../contexts/AdminPanelContext";
import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter").max(12, "Username terlalu panjang"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(ROLE_OPTIONS).nullable(),
});

export const editUserSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter").max(12, "Username terlalu panjang"),
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
});

export type RegisterUserForm = z.infer<typeof registerUserSchema>;
export type EditUserForm = z.infer<typeof editUserSchema>;
