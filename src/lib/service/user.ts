import { ListParams, LoginRequest } from "@/types/api";
import { getUserList, postLogin, postLogout, postRefreshToken } from "../api/auth";

class UserService {
  public get = {
    list: async ({
      token,
      searchParams
    }: {
      token: string
      searchParams: {
        page?: number
        size?: number
        sort?: ["id" | "email" | "name" | "role" | "isActive" | "lastLogin" | "createdAt", "asc" | "desc"]
      }
    }) => {
      return await getUserList({
        token,
        searchParams: {
          page: searchParams.page,
          size: searchParams.size,
          sort: searchParams.sort
        }
      })
    }
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
