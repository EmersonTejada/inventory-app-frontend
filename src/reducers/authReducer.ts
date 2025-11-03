import type { User } from "@/types/user";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  checking: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
  checking: true,
};

export type AuthActions =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_CHECKING"; payload: boolean };

export const authReducer = (
  state: AuthState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload, error: null };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...initialAuthState };
    case "SET_CHECKING":
      return { ...state, checking: action.payload };
    default:
      return state;
  }
};
