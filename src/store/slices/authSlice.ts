import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSettings {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: UserSettings | null;
  lastLogin: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
  lastLogin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.lastLogin = new Date().toISOString();
    },
    setUser: (state, action: PayloadAction<UserSettings>) => {
      state.user = action.payload;
    },
    updateUserSettings: (state, action: PayloadAction<Partial<UserSettings>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.lastLogin = null;
    },
  },
});

export const { setTokens, setUser, updateUserSettings, clearTokens } = authSlice.actions;
export default authSlice.reducer;
