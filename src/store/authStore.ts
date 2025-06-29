import { create } from "zustand";
import { login as apiLogin } from "@/http/api";
import { storeUserData, clearAuthStorage, getUserData } from "@/utils";
import { STORAGE_KEY } from "@/constants";

const initialUserData = getUserData(STORAGE_KEY);

type AuthState = {
  token: string | null;
  userId: string | null;
  userGroupId: string | null;
  companyId: string | null;
  isValid: boolean;
};

type AuthActions = {
  login: (userId: string, password: string) => Promise<void>;
  logout: () => void;
};

const getInitialState = (): AuthState => ({
  token: initialUserData?.Token ?? null,
  userId: initialUserData?.UserId ?? null,
  userGroupId: initialUserData?.UserGroupId ?? null,
  companyId: initialUserData?.CompanyId ?? null,
  isValid: initialUserData?.IsValid === "true",
});

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...getInitialState(),

  login: async (userId, password) => {
    try {
      const payload = { LoginId: userId, Password: password, isValid: "" };
      const response = await apiLogin(payload);
      const user = response?.UserValid?.[0];

      if (user) {
        storeUserData(STORAGE_KEY, user);
        set({
          token: user.Token ?? null,
          userId: user.UserId ?? null,
          userGroupId: user.UserGroupId ?? null,
          companyId: user.CompanyId ?? null,
          isValid: user.IsValid === "true",
        });
      } else {
        clearAuthStorage(STORAGE_KEY);
        set(getInitialState());
      }
    } catch (error) {
      console.error("Login failed", error);
      clearAuthStorage(STORAGE_KEY);
      set(getInitialState());
    }
  },

  logout: () => {
    clearAuthStorage(STORAGE_KEY);
    set(getInitialState());
  },
}));
