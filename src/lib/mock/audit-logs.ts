import type { AdminAuditLogResponse } from "@/types/api";

export const mockDlqSize = 128;

export const mockAuditLogs: AdminAuditLogResponse[] = [
  { id: 91032, createdAt: "2026-08-15T08:12:04+09:00", action: "LOGIN", targetType: "USER", targetId: 1042, userId: 1042, ipAddress: "121.190.22.11", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", details: {} },
  { id: 91028, createdAt: "2026-08-14T21:47:32+09:00", action: "UPDATE", targetType: "MEMORIAL", targetId: 2018, userId: 1038, ipAddress: "121.190.22.19", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", details: { field: "status", from: "PENDING", to: "APPROVED" } },
  { id: 91014, createdAt: "2026-08-14T13:05:11+09:00", action: "DELETE", targetType: "TRIBUTE", targetId: 5203, userId: 1038, ipAddress: "121.190.22.19", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", details: { reason: "부적절한 게시물" } },
  { id: 90998, createdAt: "2026-08-13T16:40:52+09:00", action: "UPDATE", targetType: "USER", targetId: 861, userId: 1042, ipAddress: "121.190.22.11", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", details: { field: "isActive", from: true, to: false } },
  { id: 90975, createdAt: "2026-08-13T09:15:03+09:00", action: "CREATE", targetType: "ANNOUNCEMENT", targetId: 38, userId: 1038, ipAddress: "121.190.22.19", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", details: {} },
  { id: 90944, createdAt: "2026-08-12T11:44:09+09:00", action: "CREATE", targetType: "MEMORIAL", targetId: 2027, userId: 812, ipAddress: "223.38.10.4", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)", details: {} },
  { id: 90902, createdAt: "2026-08-11T22:01:47+09:00", action: "LOGOUT", targetType: "USER", targetId: 1038, userId: 1038, ipAddress: "121.190.22.19", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", details: {} },
];
