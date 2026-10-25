import { AnnouncementListSchema } from "@/constants/announcement"
import { http } from "../utils"
import * as v from "valibot"

export async function getAnnouncementList() {
  try {
    const response = await http.get("announcement/list").json()
    return v.parse(AnnouncementListSchema, response)
  } catch (error) {
    throw error
  }
}
