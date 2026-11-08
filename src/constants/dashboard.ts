import * as v from "valibot"
import { ListSchema } from "./List"

export const dashboardStatsSchema = v.object({
  users: v.number(),
  memorials: v.number(),
  tributes: v.number(),
  offerings: v.number(),
  guestbooks: v.number()
})

export const dashboardRecentUserSchema = v.object({
  ...ListSchema.entries,
  content: v.array(v.object({
    id: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.picklist(["SUPER_ADMIN", "ADMIN", "USER"]),
    isActive: v.boolean(),
    lastLoginAt: v.nullable(v.string()),
    createdAt: v.string()
  }))
})

export const dashboardActiveUserSchema = v.array(v.object({
  id: v.string(),
  count: v.number()
}))

export const dashboardActiveMemorialSchema = v.array(v.object({
  id: v.string(),
  count: v.number()
}))
