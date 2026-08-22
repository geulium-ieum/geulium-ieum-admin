import type { GuestbookResponse, TributeResponse } from "@/types/api";

export const mockTributes: TributeResponse[] = [
  { id: 5231, memorialId: 2018, userId: 992, content: "선생님, 늘 감사했습니다. 편히 쉬세요.", isPublic: true, createdAt: "2026-08-14T21:10:00+09:00", updatedAt: "2026-08-14T21:10:00+09:00" },
  { id: 5228, memorialId: 2011, userId: 887, content: "할머니 보고 싶어요. 그곳에서는 아프지 마세요.", isPublic: true, createdAt: "2026-08-14T13:44:00+09:00", updatedAt: "2026-08-14T13:44:00+09:00" },
  { id: 5219, memorialId: 2004, userId: 812, content: "언제나 웃는 얼굴로 반겨주셨던 모습이 눈에 선합니다.", isPublic: true, createdAt: "2026-08-13T19:02:00+09:00", updatedAt: "2026-08-13T19:02:00+09:00" },
  { id: 5203, memorialId: 2018, userId: 954, content: "부적절한 광고성 문구가 포함된 신고 대상 게시물입니다.", isPublic: true, createdAt: "2026-08-12T08:20:00+09:00", updatedAt: "2026-08-12T08:20:00+09:00" },
  { id: 5197, memorialId: 2011, userId: 799, content: "따뜻했던 기억, 오래도록 간직하겠습니다.", isPublic: true, createdAt: "2026-08-11T15:55:00+09:00", updatedAt: "2026-08-11T15:55:00+09:00" },
  { id: 5188, memorialId: 2004, userId: 902, content: "그리운 마음을 담아 인사드립니다.", isPublic: false, createdAt: "2026-08-10T10:30:00+09:00", updatedAt: "2026-08-10T10:30:00+09:00" },
];

export const mockGuestbooks: GuestbookResponse[] = [
  { id: 7412, memorialId: 2018, userId: 992, authorName: "김윤서", content: "삼가 고인의 명복을 빕니다.", isApproved: true },
  { id: 7409, memorialId: 2011, userId: 0, authorName: "익명", content: "좋은 곳에서 편히 쉬시길 바랍니다.", isApproved: false },
  { id: 7401, memorialId: 2004, userId: 840, authorName: "강재원", content: "생전 베풀어주신 정 잊지 않겠습니다.", isApproved: true },
  { id: 7397, memorialId: 2018, userId: 0, authorName: "방문객", content: "http://spam-link.example 홍보성 방명록입니다.", isApproved: false },
  { id: 7390, memorialId: 2011, userId: 931, authorName: "안도산", content: "삼가 조의를 표합니다.", isApproved: true },
];
