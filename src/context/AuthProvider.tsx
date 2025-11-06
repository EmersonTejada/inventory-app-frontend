import { useCallback, useReducer, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer, initialAuthState } from "@/reducers/authReducer";
import type { UserLogin } from "@/types/user";
import * as authService from "../services/authService";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { useNavigate } from "react-router";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate()

  const loginUser = async (userLogin: UserLogin) => {
    try {
      dispatch({ type: "LOGIN_START" });
      await authService.loginUser(userLogin);
      const user = await authService.verifyAuth();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return user;
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "LOGIN_ERROR", payload: err.message });
      } else {
        dispatch({ type: "LOGIN_ERROR", payload: "Error desconocido" });
      }
      throw err;
    }
  };

  const authVerify = useCallback(async () => {
    try {
      dispatch({ type: "LOGIN_START" });
      const user = await authService.verifyAuth();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return true;
    } catch {
      dispatch({ type: "LOGOUT" });
      return false;
    } finally {
      dispatch({ type: "SET_CHECKING", payload: false });
    }
  }, []);

  const logoutUser = async () => {
    try {
      await authService.logoutUser();
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "SET_CHECKING", payload: true })
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR", payload: getErrorMessage(err) });
    }
  };

  return (
    <AuthContext value={{ state, loginUser, authVerify, logoutUser }}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
