import { AuthProvider } from "ra-core";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: number;
    firstName: string;
    lastName: string;
    pictureUrl: string | null;
  };
}

const getStoredAuth = (): AuthData | null => {
  const auth = localStorage.getItem("fit2go_admin_auth");
  return auth ? JSON.parse(auth) : null;
};

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Invalid credentials");
    }

    const { access_token, refresh_token, user } = await response.json();
    const authData: AuthData = {
      accessToken: access_token,
      refreshToken: refresh_token,
      user,
    };

    localStorage.setItem("fit2go_admin_auth", JSON.stringify(authData));
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem("fit2go_admin_auth");
    return Promise.resolve();
  },

  checkError: (error) => {
    // We don't need to handle token refresh here anymore as it's handled in the dataProvider
    return Promise.resolve();
  },

  checkAuth: () => {
    const auth = getStoredAuth();
    if (!auth) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const auth = getStoredAuth();
    return Promise.resolve(auth?.user.role || null);
  },

  getIdentity: () => {
    const auth = getStoredAuth();
    if (!auth) {
      return Promise.reject();
    }
    return Promise.resolve({
      id: auth.user.id,
      fullName: `${auth.user.firstName} ${auth.user.lastName}`,
    });
  },
};
