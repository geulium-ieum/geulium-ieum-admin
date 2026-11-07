import { dashboardActiveMemorialSchema, dashboardActiveUserSchema, dashboardRecentUserSchema, dashboardStatsSchema } from "@/constants/dashboard";
import { http } from "../utils"
import * as v from "valibot"
import { RecentUserSortField, SortDirection } from "@/types/api";

export async function getActiveMemorial({
  token,
  days
}: {
  token: string
  days: number
}) {
  try {
    const response = await http.get("admin/dashboard/active-memorial", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      searchParams: {
        days
      }
    }).json()
    return v.parse(dashboardActiveMemorialSchema, response)
  } catch (error) {
    throw error
  }
}

export async function getActiveUser({
  token,
  days
}: {
  token: string
  days: number
}) {
  try {
    const response = await http.get("admin/dashboard/active-memorial", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      searchParams: {
        days
      }
    }).json()
    return v.parse(dashboardActiveUserSchema, response)
  } catch (error) {
    throw error
  }
}

export async function getRecentUser({
  token,
  searchParams
}: {
  token: string
  searchParams: {
    page?: number
    size?: number
    sort?: [RecentUserSortField, SortDirection]
  }
}) {
  try {
    const response = await http.get("admin/dashboard/recent-user", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      searchParams: {
        page: searchParams.page,
        size: searchParams.size,
        sort: searchParams.sort && searchParams.sort.join(",")
      }
    }).json()
    return v.parse(dashboardRecentUserSchema, response)
  } catch (error) {
    throw error
  }
}

export async function getStats({
  token
}: {
  token: string
}) {
  try {
    const response = await http.get("admin/dashboard/stats", {
      headers: {
        "Authentication": `Bearer ${token}`
      }
    }).json()
    return v.parse(dashboardStatsSchema, response)
  } catch (error) {
    throw error
  }
}
