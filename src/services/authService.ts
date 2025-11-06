import type { User, UserLogin } from "@/types/user";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (user: UserLogin) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(res);
      throw new Error(`${data.message}`);
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const verifyAuth = async (): Promise<User> => {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(
        `Ha habido un error al verificar la autenticación: ${res.statusText}`
      );
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(
        `Ha habido un error al cerrar sesión: ${res.statusText}`
      );
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
