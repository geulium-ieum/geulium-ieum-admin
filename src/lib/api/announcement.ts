import { AnnouncementDetailSchema, AnnouncementListSchema } from "@/constants/announcement"
import { http } from "../utils"
import * as v from "valibot"
import { AnnouncementSortField, SortDirection } from "@/types/api"
import { getAccessToken } from "../server/auth"

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

export async function getAnnouncementDetail({ id }: { id: string }) {
  try {
    const response = await http.get(`announcement/${id}`).json()
    return v.parse(AnnouncementDetailSchema, response)
  } catch (error) {
    throw error
  }
}

export async function postAnnouncement({
  title,
  content,
  isPinned
}: {
  title: string
  content: string
  isPinned: boolean
}) {
  try {
    const token = await getAccessToken()
    await http.post("admin/announcement", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      json: {
        title,
        content,
        isPinned
      }
    })
  } catch (error) {
    throw error
  }
}

export async function postAnnouncementPublish({ id }: { id: string }){
  try {
    const token = await getAccessToken()
    await http.post(`admin/announcement/${id}/publish`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}

export async function putAnnouncementDetail({
  id,
  title,
  content,
  isPinned
}: {
  id: string
  title: string
  content: string
  isPinned: boolean
}) {
  try {
    const token = await getAccessToken()
    await http.put(`admin/announcement/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      json: {
        title,
        content,
        isPinned
      }
    })
  } catch (error) {
    throw error
  }
}

export async function deleteAnnouncementDetail({ id }: { id: string }) {
  try {
    const token = await getAccessToken()
    await http.delete(`admin/announcement/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error
  }
}
