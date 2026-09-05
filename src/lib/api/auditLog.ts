import { AdminAuditLogRequest } from "@/types/api"
import { http } from "../utils"
import * as v from "valibot"
import { AuditLogDLQReprocessSchema, AuditLogSchema } from "@/constants/auditLog"

export async function getAuditLogs({
  token,
  action,
  targetType,
  userId,
  from,
  to,
  page,
  size,
  sort
}: AdminAuditLogRequest) {
  try {
    const response = await http.get("admin/audit-logs", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      searchParams: {
        action,
        targetType,
        userId,
        from,
        to,
        page,
        size,
        sort: sort && sort.map(s => `${s.field},${s.direction}`).join(",")
      }
    }).json()
    return v.parse(AuditLogSchema, response)
  } catch (error) {
    throw error
  }
}

export async function getAuditLogDLQSize({
  token
}: {
  token: string
}) {
  try {
    const response = await http.get("admin/audit-logs/dlq/sizes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).json()
    return v.parse(v.number(), response)
  } catch (error) {
    throw error
  }
}

export async function postAuditLogDLGReprocess({
  token,
  max = 100
}: {
  token: string
  max?: number
}) {
  try {
    const response = await http.post("admin/audit-logs/dlq/reprocess", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      json: {
        max
      }
    }).json()
    return v.parse(AuditLogDLQReprocessSchema, response)
  } catch (error) {
    throw error
  }
}

export async function deleteAuditLogDLQPurge({
  token,
  max = 100
}: {
  token: string
  max?: number
}) {
  try {
    const response = await http.delete("admin/audit-logs/dlq/purge", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      json: {
        max
      }
    }).json()
    return v.parse(v.number(), response)
  } catch (error) {
    throw error
  }
}
