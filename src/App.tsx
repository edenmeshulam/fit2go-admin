import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createContext, useState } from "react";
import { Admin, Resource } from "react-admin";

import { BusinessCreate, BusinessEdit, BusinessList } from "./components/business";

import { authProvider } from "./authProvider";
import { BookingEdit, BookingList } from "./components/bookings";
import { CreditCardList } from "./components/credit-cards";
import { Dashboard } from "./components/dashboard/Dashboard";
import {
  BookingIcon,
  BusinessIcon,
  CreditCardIcon,
  NotificationIcon,
  OtpIcon,
  PackageIcon,
  PurchaseIcon,
  RefreshTokenIcon,
  ReviewIcon,
  ServiceIcon,
  UserIcon,
} from "./components/icons";
import { CustomLayout } from "./components/layout/CustomLayout";
import { NotificationEdit, NotificationList, PushNotificationCreate } from "./components/notifications";
import { OtpEdit, OtpList } from "./components/otps";
import { PackageCreate, PackageEdit, PackageList } from "./components/packages";
import { PurchaseList } from "./components/purchases";
import { RefreshTokenEdit, RefreshTokenList } from "./components/refresh-tokens";
import { ReviewEdit, ReviewList } from "./components/reviews";
import { ServiceCreate, ServiceEdit, ServiceList } from "./components/services";
import { UserCreate, UserEdit, UserList } from "./components/users";
import { dataProvider } from "./dataProvider";
import { theme } from "./theme";

// Create theme context
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Theme provider component
const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const App = () => {
  return (
    <ThemeContextProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode }) => (
          <ThemeProvider theme={isDarkMode ? theme.dark : theme.light}>
            <CssBaseline />
            <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider} layout={CustomLayout} requireAuth>
              <Resource name="business" list={BusinessList} edit={BusinessEdit} create={BusinessCreate} icon={BusinessIcon} />
              <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} />
              <Resource name="services" list={ServiceList} edit={ServiceEdit} create={ServiceCreate} icon={ServiceIcon} />
              <Resource name="packages" list={PackageList} edit={PackageEdit} create={PackageCreate} icon={PackageIcon} />
              <Resource name="bookings" list={BookingList} edit={BookingEdit} icon={BookingIcon} />
              <Resource name="reviews" list={ReviewList} edit={ReviewEdit} icon={ReviewIcon} />
              <Resource name="credit-cards" list={CreditCardList} icon={CreditCardIcon} />
              <Resource name="purchases" list={PurchaseList} icon={PurchaseIcon} />
              <Resource name="refresh-tokens" list={RefreshTokenList} edit={RefreshTokenEdit} icon={RefreshTokenIcon} />
              <Resource name="otps" list={OtpList} edit={OtpEdit} icon={OtpIcon} />
              <Resource
                name="notifications"
                list={NotificationList}
                create={PushNotificationCreate}
                edit={NotificationEdit}
                icon={NotificationIcon}
              />
            </Admin>
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeContextProvider>
  );
};

export default App;
