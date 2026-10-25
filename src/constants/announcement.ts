import * as v from "valibot"
import { ListSchema } from "./List"

export const AnnouncementListSchema = v.object({
  ...ListSchema.entries,
  content: v.array(v.object({
    id: v.string(),
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    isPinned: v.boolean(),
    isPublished: v.boolean(),
    publishedAt: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
    authorName: v.string()
  }))
})
