import { AnnouncementListSchema } from "@/constants/announcement"
import { http } from "../utils"
import * as v from "valibot"
import { AnnouncementSortField, SortDirection } from "@/types/api"

export async function getAnnouncementList({ searchParams }: {
  searchParams: {
    page?: number
    size?: number
    sort?: [AnnouncementSortField, SortDirection]
  }
}) {
  try {
    const response = await http.get("announcement/list", {
      searchParams: {
        page: searchParams.page,
        size: searchParams.size,
        sort: searchParams.sort && searchParams.sort.join(",")
      }
    }).json()
    return v.parse(AnnouncementListSchema, response)
  } catch (error) {
    throw error
  }
}
