import { LoginRequest, SortDirection, UserRole, UserSortField } from "@/types/api";
import { postLogin, postLogout, postRefreshToken } from "../api/auth";
import { getUser, getUserList, patchActivateUser, patchRole, patchDeactivateUser, deleteUser } from "../api/user";

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
  public patch = {
    activate: async ({ id }: { id: string }) => {
      return await patchActivateUser({ id });
    },
    deactivate: async ({ id }: { id: string }) => {
      return await patchDeactivateUser({ id });
    },
    role: async ({
      id,
      role
    }: {
      id: string
      role: UserRole
    }) => {
      return await patchRole({ id, role })
    }
  }
  public delete = {
    user: async ({ id }: { id: string }) => {
      return await deleteUser({ id })
    }
  }
}

export const userService = new UserService();
