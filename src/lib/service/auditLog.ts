import { AdminAuditLogRequest, AuditAction, ListParams } from "@/types/api"
import { deleteAuditLogDLQPurge, getAuditLogDLQSize, getAuditLogs, postAuditLogDLGReprocess } from "../api/auditLog"

class AuditService {
  public get = {
    auditLogs: async ({
      token,
      action,
      targetType,
      userId,
      from,
      to,
      page,
      size,
      sort
    }: AdminAuditLogRequest) => {
      return await getAuditLogs({
        token,
        action,
        targetType,
        userId,
        from,
        to,
        page,
        size,
        sort
      })
    },
    DLQSize: async ({
      token
    }: {
      token: string
    }) => {
      return await getAuditLogDLQSize({ token })
    }
  }
  public post = {
    DLQReprocess: async ({
      token,
      max
    }: {
      token: string
      max?: number
    }) => {
      return await postAuditLogDLGReprocess({
        token,
        max
      })
    }
  }
  public delete = {
    DLQPurge: async ({
      token,
      max
    }: {
      token: string
      max?: number
    }) => {
      return await deleteAuditLogDLQPurge({
        token,
        max
      })
    }
  }
}

export const auditService = new AuditService();
