import type { AdminUserDetailResponse, AdminUserListItemResponse } from "@/types/api";

export const mockUsers: AdminUserListItemResponse[] = [
  { id: 1042, email: "yoonseo.kim@gmail.com", name: "김윤서", role: "SUPER_ADMIN", isActive: true, lastLoginAt: "2026-08-15T08:12:00+09:00", createdAt: "2024-02-11T10:00:00+09:00" },
  { id: 1038, email: "jihoon.park@naver.com", name: "박지훈", role: "ADMIN", isActive: true, lastLoginAt: "2026-08-14T21:44:00+09:00", createdAt: "2024-03-02T09:30:00+09:00" },
  { id: 992, email: "minji.lee@kakao.com", name: "이민지", role: "USER", isActive: true, lastLoginAt: "2026-08-15T07:02:00+09:00", createdAt: "2024-05-19T14:12:00+09:00" },
  { id: 987, email: "seungho.choi@naver.com", name: "최승호", role: "USER", isActive: true, lastLoginAt: "2026-08-13T11:20:00+09:00", createdAt: "2024-05-21T09:45:00+09:00" },
  { id: 954, email: "hana.jung@gmail.com", name: "정하나", role: "USER", isActive: false, lastLoginAt: "2026-06-02T19:08:00+09:00", createdAt: "2024-06-03T16:02:00+09:00" },
  { id: 931, email: "dosan.ahn@naver.com", name: "안도산", role: "USER", isActive: true, lastLoginAt: "2026-08-12T08:55:00+09:00", createdAt: "2024-06-20T11:20:00+09:00" },
  { id: 902, email: "soyeon.han@gmail.com", name: "한소연", role: "USER", isActive: true, lastLoginAt: "2026-08-10T13:31:00+09:00", createdAt: "2024-07-04T10:10:00+09:00" },
  { id: 887, email: "taeyang.oh@kakao.com", name: "오태양", role: "USER", isActive: true, lastLoginAt: "2026-08-09T22:47:00+09:00", createdAt: "2024-07-15T13:50:00+09:00" },
  { id: 861, email: "eunbi.song@naver.com", name: "송은비", role: "USER", isActive: false, lastLoginAt: "2026-03-28T09:00:00+09:00", createdAt: "2024-07-28T08:40:00+09:00" },
  { id: 840, email: "jaewon.kang@gmail.com", name: "강재원", role: "USER", isActive: true, lastLoginAt: "2026-08-08T17:16:00+09:00", createdAt: "2024-08-09T15:33:00+09:00" },
  { id: 812, email: "yerin.moon@gmail.com", name: "문예린", role: "USER", isActive: true, lastLoginAt: "2026-08-05T12:02:00+09:00", createdAt: "2024-08-22T09:12:00+09:00" },
  { id: 799, email: "sungmin.yoo@naver.com", name: "유성민", role: "USER", isActive: true, lastLoginAt: "2026-07-30T20:41:00+09:00", createdAt: "2024-09-01T10:05:00+09:00" },
];

export const mockUserDetails: Record<number, AdminUserDetailResponse> = Object.fromEntries(
  mockUsers.map((u) => [
    u.id,
    {
      id: u.id,
      email: u.email,
      name: u.name,
      phone: "010-4821-6630",
      role: u.role,
      profilePhotoUrl: "",
      isActive: u.isActive,
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
      updatedAt: u.lastLoginAt,
      tributeCount: Math.max(0, Math.round((u.id % 47) * 1.3)),
      offeringCount: Math.max(0, Math.round((u.id % 31) * 2.1)),
      guestbookCount: Math.max(0, Math.round((u.id % 23) * 0.8)),
    } satisfies AdminUserDetailResponse,
  ])
);
