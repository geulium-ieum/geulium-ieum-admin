import type { AdminAnnouncementResponse } from "@/types/api";

export const mockAnnouncements: AdminAnnouncementResponse[] = [
  { id: 41, title: "추석 연휴 고객센터 운영 안내", content: "추석 연휴 기간 동안 고객센터 운영시간이 단축됩니다. 자세한 내용은 본문을 참고해 주세요.", authorId: 1042, isPinned: true, isPublished: true, publishedAt: "2026-08-10T09:00:00+09:00", createdAt: "2026-08-09T17:20:00+09:00", updatedAt: "2026-08-10T09:00:00+09:00" },
  { id: 40, title: "추모관 사진 업로드 용량 제한 변경 안내", content: "추모관 대표 사진 및 앨범 업로드 최대 용량이 10MB에서 20MB로 상향됩니다.", authorId: 1038, isPinned: false, isPublished: true, publishedAt: "2026-08-05T10:00:00+09:00", createdAt: "2026-08-04T14:00:00+09:00", updatedAt: "2026-08-05T10:00:00+09:00" },
  { id: 39, title: "개인정보처리방침 개정 사전 안내", content: "개인정보처리방침이 2026년 9월 1일부로 개정될 예정입니다.", authorId: 1042, isPinned: false, isPublished: true, publishedAt: "2026-07-28T11:00:00+09:00", createdAt: "2026-07-27T16:40:00+09:00", updatedAt: "2026-07-28T11:00:00+09:00" },
  { id: 38, title: "시스템 정기 점검 사전 공지 (초안)", content: "8월 넷째 주 화요일 새벽 시간대 시스템 정기 점검이 예정되어 있습니다. 세부 일정 확정 후 발행 예정입니다.", authorId: 1038, isPinned: false, isPublished: false, publishedAt: null, createdAt: "2026-08-13T09:15:00+09:00", updatedAt: "2026-08-13T09:15:00+09:00" },
];
