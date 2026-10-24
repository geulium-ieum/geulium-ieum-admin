import { SortDirection, TributeSortField } from "@/types/api"
import { http } from "../utils"
import * as v from "valibot"
import { TributeListSchema } from "@/constants/tribute"

export async function getTributeList({
  token,
  searchParams
}: {
  token: string
  searchParams: {
    page?: number
    size?: number
    sort?: [TributeSortField, SortDirection]
  }
}) {
  try {
    const response = await http.get("admin/content/tribute", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      searchParams: {
        page: searchParams.page,
        size: searchParams.size,
        sort: searchParams.sort && searchParams.sort.join(",")
      }
    }).json()
    return v.parse(TributeListSchema, response)
  } catch (error) {
    throw error
  }
}

export async function deleteTribute({
  token,
  id
}: {
  token: string
  id: string
}) {
  try {
    await http.delete(`admin/content/tribute/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}
