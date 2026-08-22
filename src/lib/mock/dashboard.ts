import type { ActiveItemResponse, SystemStatsResponse } from "@/types/api";

export const mockSystemStats: SystemStatsResponse = {
  users: 12480,
  memorials: 3092,
  tributes: 41870,
  offerings: 58213,
  guestbooks: 19664,
};

export const mockActiveUsers: ActiveItemResponse[] = [
  { id: 992, count: 61 },
  { id: 887, count: 54 },
  { id: 812, count: 47 },
  { id: 799, count: 39 },
  { id: 902, count: 33 },
];

export const mockActiveMemorials: ActiveItemResponse[] = [
  { id: 2018, count: 82 },
  { id: 2011, count: 70 },
  { id: 2004, count: 58 },
  { id: 1996, count: 44 },
  { id: 2029, count: 31 },
];
