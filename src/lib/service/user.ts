import { LoginRequest, SortDirection, UserSortField } from "@/types/api";
import { postLogin, postLogout, postRefreshToken } from "../api/auth";
import { getUser, getUserList } from "../api/user";

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
        sort?: [UserSortField, SortDirection]
      }
    }) => {
      return await getUserList({
        token,
        searchParams
      })
    },
    user: async ({
      token,
      id
    }: {
      token: string
      id: string
    }) => {
      return await getUser({ token, id })
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
