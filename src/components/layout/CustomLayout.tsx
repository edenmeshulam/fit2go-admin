import {
  Event as BookingIcon,
  Business as BusinessIcon,
  CreditCard as CreditCardIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  Lock as OtpIcon,
  Inventory as PackageIcon,
  ShoppingCart as PurchaseIcon,
  Refresh as RefreshTokenIcon,
  Star as ReviewIcon,
  LocalOffer as ServiceIcon,
  Settings as SettingsIcon,
  People as UserIcon,
} from "@mui/icons-material";
import { AppBar, Box, Drawer, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { Layout, Menu as RaMenu, useGetIdentity } from "react-admin";
import { ThemeContext } from "../../App";
import { LogoutButton } from "./LogoutButton";
import { UserSettings } from "./UserSettings";

const DRAWER_WIDTH = 240;

// Define color constants
const GRADIENTS = {
  dark: {
    sidebar: "linear-gradient(180deg, #0A1929 0%, #1A2027 100%)",
    header: "linear-gradient(90deg, #0A1929 0%, #1A2027 100%)",
    accent: "rgba(64, 122, 214, 0.2)",
  },
  light: {
    sidebar: "linear-gradient(180deg, #1E3A8A 0%, #1E40AF 100%)",
    header: "linear-gradient(90deg, #1E3A8A 0%, #1E40AF 100%)",
    accent: "rgba(255, 255, 255, 0.15)",
  },
};

const CustomMenu = () => {
  const theme = useTheme();
  const gradients = theme.palette.mode === "dark" ? GRADIENTS.dark : GRADIENTS.light;

  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: "100%",
        background: gradients.sidebar,
        color: "#fff",
        "& .RaMenu-item": {
          color: "rgba(255, 255, 255, 0.9)",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: 1,
          background: gradients.accent,
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#fff",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Fit2Go Admin
        </Typography>
      </Box>
      <RaMenu
        sx={{
          mt: 1,
          px: 1,
          "& .RaMenu-item": {
            borderRadius: 1,
            margin: "4px 0",
            padding: "8px 16px",
            transition: "all 0.2s",
            color: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: gradients.accent,
              color: "#fff",
              transform: "translateX(4px)",
            },
            "& .RaMenu-icon": {
              color: "rgba(255, 255, 255, 0.9)",
              minWidth: 40,
            },
          },
          "& .RaMenu-active": {
            backgroundColor: `${gradients.accent} !important`,
            color: "#fff",
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              backgroundColor: theme.palette.mode === "dark" ? "#60A5FA" : "#fff",
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              boxShadow: theme.palette.mode === "dark" ? "0 0 8px rgba(96, 165, 250, 0.5)" : "none",
            },
          },
        }}
      >
        <RaMenu.Item to="/business" primaryText="Businesses" leftIcon={<BusinessIcon />} />
        <RaMenu.Item to="/users" primaryText="Users" leftIcon={<UserIcon />} />
        <RaMenu.Item to="/services" primaryText="Services" leftIcon={<ServiceIcon />} />
        <RaMenu.Item to="/packages" primaryText="Packages" leftIcon={<PackageIcon />} />
        <RaMenu.Item to="/bookings" primaryText="Bookings" leftIcon={<BookingIcon />} />
        <RaMenu.Item to="/reviews" primaryText="Reviews" leftIcon={<ReviewIcon />} />
        <RaMenu.Item to="/credit-cards" primaryText="Credit Cards" leftIcon={<CreditCardIcon />} />
        <RaMenu.Item to="/purchases" primaryText="Purchases" leftIcon={<PurchaseIcon />} />
        <RaMenu.Item to="/notifications" primaryText="Notifications" leftIcon={<NotificationIcon />} />
        <RaMenu.Item to="/otps" primaryText="OTPs" leftIcon={<OtpIcon />} />
        <RaMenu.Item to="/refresh-tokens" primaryText="Refresh Tokens" leftIcon={<RefreshTokenIcon />} />
      </RaMenu>
    </Box>
  );
};

const CustomAppBar = () => {
  const theme = useTheme();
  const gradients = theme.palette.mode === "dark" ? GRADIENTS.dark : GRADIENTS.light;
  const { identity } = useGetIdentity();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    setShowSettings(true);
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          background: gradients.header,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "64px",
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "#fff",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleTheme}
              sx={{
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton
              size="large"
              aria-label="account settings"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 8,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.3))",
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 180,
                  background: gradients.sidebar,
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    margin: "4px 8px",
                    color: "#fff",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: gradients.accent,
                      transform: "translateX(4px)",
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleSettings}>
                <Typography sx={{ color: "#fff" }}>Settings</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <LogoutButton />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              background: gradients.sidebar,
            },
          }}
        >
          <CustomMenu />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              background: gradients.sidebar,
              borderRight: "none",
              boxShadow: theme.palette.mode === "dark" ? "4px 0 8px rgba(0, 0, 0, 0.3)" : "none",
            },
          }}
          open
        >
          <CustomMenu />
        </Drawer>
      </Box>

      {showSettings && <UserSettings onClose={() => setShowSettings(false)} />}
    </>
  );
};

export const CustomLayout = (props: any) => {
  const theme = useTheme();

  return (
    <Layout
      {...props}
      menu={CustomMenu}
      appBar={CustomAppBar}
      sx={{
        "& .RaLayout-root": {
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
          minHeight: "100vh",
          backgroundColor: theme.palette.mode === "dark" ? "#0A1018" : "#F1F5F9",
          color: theme.palette.text.primary,
        },
        "& .RaLayout-content": {
          padding: 2,
          flex: 1,
          flexGrow: 1,
          marginTop: "64px",
          // marginLeft: { sm: `${DRAWER_WIDTH}px` },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          backgroundColor: theme.palette.mode === "dark" ? "#0A1018" : "#F1F5F9",
        },
        "& .RaLayout-appFrame": {
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginLeft: 0,
        },
      }}
    />
  );
};
