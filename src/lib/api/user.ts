import { SortDirection, UserSortField } from "@/types/api"
import { http } from "../utils"
import { UserAdminSchema, UserListSchema } from "@/constants/user"
import * as v from "valibot"

export async function getUserList({
  token,
  searchParams
}: {
  token: string
  searchParams: {
    page?: number
    size?: number
    sort?: [UserSortField, SortDirection]
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

export async function getUser({
  token,
  id
}: {
  token: string
  id: string
}) {
  try {
    const response = await http.get(`admin/user/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).json()
    return v.parse(UserAdminSchema, response)
  } catch (error) {
    throw error
  }
}
