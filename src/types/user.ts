export interface User {
  id: number;
  username: string;
}

export type UserLogin = Omit<User, "id"> & { password: string };
