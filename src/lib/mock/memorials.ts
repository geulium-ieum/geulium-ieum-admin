import type { MemorialResponse, MemorialWithStatsResponse } from "@/types/api";

export const mockMemorials: MemorialResponse[] = [
  { id: 2031, deceasedName: "김OO", birthDate: "1948-03-11", deathDate: "2026-07-30", location: "서울추모공원", biography: "평생 교직에 몸담으며 제자들을 사랑으로 이끌었습니다.", photoUrl: "", visibility: "PUBLIC", status: "PENDING", createdBy: 992, updatedBy: 992, createdAt: "2026-08-14T09:20:00+09:00", updatedAt: "2026-08-14T09:20:00+09:00" },
  { id: 2029, deceasedName: "박OO", birthDate: "1955-11-02", deathDate: "2026-08-01", location: "경기추모공원", biography: "따뜻한 마음으로 이웃을 돌보던 분이었습니다.", photoUrl: "", visibility: "FAMILY_ONLY", status: "PENDING", createdBy: 887, updatedBy: 887, createdAt: "2026-08-13T15:02:00+09:00", updatedAt: "2026-08-13T15:02:00+09:00" },
  { id: 2027, deceasedName: "이OO", birthDate: "1961-05-19", deathDate: "2026-07-25", location: "", biography: "성실함으로 가족을 지켜온 든든한 가장이었습니다.", photoUrl: "", visibility: "PUBLIC", status: "PENDING", createdBy: 812, updatedBy: 812, createdAt: "2026-08-12T11:44:00+09:00", updatedAt: "2026-08-12T11:44:00+09:00" },
  { id: 2018, deceasedName: "최OO", birthDate: "1939-01-27", deathDate: "2026-06-30", location: "인천승화원", biography: "평생을 정직과 성실로 살아오신 분입니다.", photoUrl: "", visibility: "PUBLIC", status: "APPROVED", createdBy: 799, updatedBy: 1038, createdAt: "2026-07-01T10:00:00+09:00", updatedAt: "2026-07-02T09:12:00+09:00" },
  { id: 2011, deceasedName: "정OO", birthDate: "1950-09-08", deathDate: "2026-06-15", location: "서울추모공원", biography: "손주들에게 늘 다정했던 할머니였습니다.", photoUrl: "", visibility: "PUBLIC", status: "APPROVED", createdBy: 954, updatedBy: 1038, createdAt: "2026-06-16T08:30:00+09:00", updatedAt: "2026-06-17T09:00:00+09:00" },
  { id: 2004, deceasedName: "한OO", birthDate: "1944-12-24", deathDate: "2026-05-20", location: "부산영락공원", biography: "동네에서 소문난 인정 많은 분이었습니다.", photoUrl: "", visibility: "PRIVATE", status: "APPROVED", createdBy: 902, updatedBy: 1042, createdAt: "2026-05-21T13:10:00+09:00", updatedAt: "2026-05-22T10:00:00+09:00" },
  { id: 1996, deceasedName: "강OO", birthDate: "1958-07-14", deathDate: "2026-04-11", location: "대전현충원", biography: "국가를 위해 헌신하신 삶이었습니다.", photoUrl: "", visibility: "PUBLIC", status: "REJECT", createdBy: 840, updatedBy: 1038, createdAt: "2026-04-12T09:50:00+09:00", updatedAt: "2026-04-13T11:20:00+09:00" },
  { id: 1988, deceasedName: "오OO", birthDate: "1967-02-02", deathDate: "2026-03-02", location: "", biography: "짧지만 밝게 살다 가신 분입니다.", photoUrl: "", visibility: "PUBLIC", status: "CANCEL", createdBy: 931, updatedBy: 931, createdAt: "2026-03-03T10:00:00+09:00", updatedAt: "2026-03-05T14:00:00+09:00" },
];

export const mockPendingMemorials = mockMemorials.filter((m) => m.status === "PENDING");

export const mockMemorialStats: Record<number, MemorialWithStatsResponse> = Object.fromEntries(
  mockMemorials.map((m) => [
    m.id,
    {
      memorialId: m.id,
      deceasedName: m.deceasedName,
      birthDate: m.birthDate,
      deathDate: m.deathDate,
      biography: m.biography,
      photoUrl: m.photoUrl,
      visibility: m.visibility,
      tributeCount: Math.max(0, (m.id % 41) * 2),
      offeringCount: Math.max(0, (m.id % 29) * 3),
      memberCount: Math.max(1, m.id % 7),
    } satisfies MemorialWithStatsResponse,
  ])
);
