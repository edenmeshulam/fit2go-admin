import { AuthProvider } from "ra-core";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

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
    const { accessToken } = await response.json();
    localStorage.setItem("auth", JSON.stringify({ accessToken }));
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      return Promise.reject();
    }
    return Promise.resolve({ id: "admin" });
  },
};
