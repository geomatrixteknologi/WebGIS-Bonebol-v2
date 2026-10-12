import { useAdminPanelContext } from "@/contexts/AdminPanelContext";
import { Box, Button } from "@mui/material";
import { UserTable } from "./Content/UserTable";
import { useRouter } from "next/navigation";
import PublicIcon from "@mui/icons-material/Public";

export function AdminPanelContent() {
  const { activeAdminPanel } = useAdminPanelContext();
  const router = useRouter();

  const renderContent = () => {
    switch (activeAdminPanel) {
      case "user":
        return <UserTable />;
      default:
        return <h2>No page selected</h2>;
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      {/* 🔙 Back Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Button variant="contained" sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} startIcon={<PublicIcon />} onClick={() => router.push("/maps")}>
          Kembali ke Maps
        </Button>
      </Box>

      <Box>{renderContent()}</Box>
    </Box>
  );
}
