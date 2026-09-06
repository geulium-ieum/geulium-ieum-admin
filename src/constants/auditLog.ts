import * as v from "valibot"
import { ListSchema } from "./List"

export const AuditLogSchema = v.object({
  ...ListSchema.entries,
  content: v.array(
    v.object({
      id: v.string(),
      createdAt: v.string(),
      action: v.picklist(["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT"]),
      targetType: v.string(),
      targetId: v.string(),
      userId: v.nullable(v.string()),
      ipAddress: v.string(),
      userAgent: v.string(),
      details: v.nullable(v.record(v.string(), v.string()))
    })
  )
})

export const AuditLogDLQReprocessSchema = v.object({
  requested: v.number(),
  fetched: v.number(),
  requeued: v.number(),
  deleted: v.number(),
  failed: v.number()
})
