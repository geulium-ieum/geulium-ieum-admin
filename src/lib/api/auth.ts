import { TokenSchema, UserListSchema } from '@/constants/user';
import { http } from '../utils';
import * as v from 'valibot';
import { SortDirection, UserSortField } from '@/types/api';

export async function getUserList({
  token,
  searchParams
}: {
  token: string
  searchParams: {
    page?: number
    size?: number
    sort?: [UserSortField, SortDirection]
    // {
    //   id: string
    //   email: string
    //   name: string
    //   role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
    //   isActive: boolean,
    //   lastLoginAt: string | null,
    //   createdAt: string
    // }
  }
}) {
  try {
    const response = await http.get("admin/user/list", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      searchParams: {
        page: searchParams.page,
        size: searchParams.size,
        sort: searchParams.sort && searchParams.sort.join(",")
      }
    }).json()
    return v.parse(UserListSchema, response)
  } catch (error) {
    throw error
  }
}

export async function postLogin({
  email,
  password
}: {
  email: string
  password: string
}) {
  try {
    const response = await http.post("auth/login", {
      json: {
        email,
        password
      }
    }).json();
    return v.parse(TokenSchema, response);
  } catch (error) {
    throw error;
  }
};

export async function postRefreshToken({
  refreshToken
}: {
  refreshToken: string
}) {
  try {
    const response = await http.post("auth/refresh", {
      json: { refreshToken }
    }).json();
    return v.parse(TokenSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function postLogout({
  refreshToken
}: {
  refreshToken: string
}) {
  try {
    await http.post("auth/logout", {
      json: { refreshToken }
    });
  } catch (error) {
    throw error;
  }
}
