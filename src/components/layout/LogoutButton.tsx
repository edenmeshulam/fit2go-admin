import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useLogout } from "react-admin";

export const LogoutButton = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      color="inherit"
      onClick={handleLogout}
      startIcon={<Logout />}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      Logout
    </Button>
  );
};
