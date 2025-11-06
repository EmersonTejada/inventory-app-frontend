import type { AuthState } from "@/reducers/authReducer";
import type { UserLogin } from "@/types/user";
import { createContext } from "react";

interface AuthContext {
  state: AuthState;
  loginUser: (user: UserLogin) => void;
  authVerify: () => Promise<boolean>
  logoutUser: () => void
}
export const AuthContext = createContext<AuthContext | undefined>(undefined);
