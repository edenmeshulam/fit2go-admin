import {
  Event as BookingIcon,
  Business as BusinessIcon,
  CreditCard as CreditCardIcon,
  Inventory as PackageIcon,
  ShoppingCart as PurchaseIcon,
  Star as ReviewIcon,
  LocalOffer as ServiceIcon,
  People as UserIcon,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Layout, Menu } from "react-admin";

const CustomMenu = () => (
  <Menu>
    <Menu.Item to="/business" primaryText="Businesses" leftIcon={<BusinessIcon />} />
    <Menu.Item to="/users" primaryText="Users" leftIcon={<UserIcon />} />
    <Menu.Item to="/services" primaryText="Services" leftIcon={<ServiceIcon />} />
    <Menu.Item to="/packages" primaryText="Packages" leftIcon={<PackageIcon />} />
    <Menu.Item to="/bookings" primaryText="Bookings" leftIcon={<BookingIcon />} />
    <Menu.Item to="/reviews" primaryText="Reviews" leftIcon={<ReviewIcon />} />
    <Menu.Item to="/credit-cards" primaryText="Credit Cards" leftIcon={<CreditCardIcon />} />
    <Menu.Item to="/purchases" primaryText="Purchases" leftIcon={<PurchaseIcon />} />
  </Menu>
);

const CustomAppBar = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      height: "100%",
      padding: "0 16px",
      backgroundColor: "#1976d2",
      color: "white",
    }}
  >
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Fit2Go Admin
    </Typography>
  </Box>
);

export const CustomLayout = (props: any) => (
  <Layout
    {...props}
    menu={CustomMenu}
    appBar={CustomAppBar}
    sx={{
      "& .RaLayout-content": {
        padding: "24px",
      },
    }}
  />
);
