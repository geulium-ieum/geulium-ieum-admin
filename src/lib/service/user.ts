import { LoginRequest } from "@/types/api";
import { postLogin, postLogout, postRefreshToken } from "../api/auth";

class UserService {
  public get = {

  }
  public post = {
    login: async ({ email, password }: LoginRequest) => {
      return await postLogin({ email, password });
    },
    refreshToken: async ({ refreshToken }: { refreshToken: string }) => {
      return await postRefreshToken({ refreshToken });
    },
    logout: async ({ refreshToken }: { refreshToken: string }) => {
      return await postLogout({ refreshToken });
    }
  }
}

export const userService = new UserService();
