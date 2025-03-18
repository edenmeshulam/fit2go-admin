import { AccountCircle, DarkMode, Email, Notifications, Security, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { useGetIdentity } from "react-admin";
import { ThemeContext } from "../../App";

interface UserSettingsProps {
  onClose: () => void;
}

export const UserSettings = ({ onClose }: UserSettingsProps) => {
  const theme = useTheme();
  const { identity } = useGetIdentity();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          m: 2,
          borderRadius: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: theme.palette.primary.main,
                mr: 2,
              }}
            >
              <AccountCircle sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h6">{identity?.fullName || "User"}</Typography>
              <Typography color="textSecondary">{identity?.email || "user@example.com"}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="Email" secondary={identity?.email || "user@example.com"} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <DarkMode />
              </ListItemIcon>
              <ListItemText primary="Dark Mode" />
              <Switch edge="end" checked={isDarkMode} onChange={toggleTheme} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
              <Switch edge="end" defaultChecked />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText primary="Security Settings" />
              <IconButton edge="end">
                <Settings />
              </IconButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
