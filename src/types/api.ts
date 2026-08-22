/**
 * openapi.json 의 스키마를 그대로 옮긴 타입 정의.
 * 실제 API 연동 시 이 타입을 fetch 결과에 그대로 사용한다.
 */

// ---------- 공통 ----------

export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface Slice<T> {
  size: number;
  content: T[];
  number: number;
  sort: SortObject;
  numberOfElements: number;
  pageable: PageableObject;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export type MemorialStatus = "PENDING" | "REJECT" | "APPROVED" | "CANCEL";
export type MemorialVisibility = "PUBLIC" | "PRIVATE" | "FAMILY_ONLY";
export type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT";

// ---------- Auth ----------

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  tokenType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export interface LogoutRequest {
  refreshToken?: string;
}

export interface FindIdRequest {
  name: string;
  phone: string;
}

export interface FindIdResponse {
  maskedEmail: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetVerifyRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface MessageResponse {
  message: string;
}

// ---------- Admin User ----------

export interface AdminUserListItemResponse {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
}

export interface AdminUserDetailResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  profilePhotoUrl: string;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  tributeCount: number;
  offeringCount: number;
  guestbookCount: number;
}

export interface RoleUpdateRequest {
  role: UserRole;
}

// ---------- Admin Memorial ----------

export interface MemorialResponse {
  id: number;
  deceasedName: string;
  birthDate: string;
  deathDate: string;
  location: string;
  biography: string;
  photoUrl: string;
  visibility: MemorialVisibility;
  status: MemorialStatus;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface MemorialWithStatsResponse {
  memorialId: number;
  deceasedName: string;
  birthDate: string;
  deathDate: string;
  biography: string;
  photoUrl: string;
  visibility: string;
  tributeCount: number;
  offeringCount: number;
  memberCount: number;
}

export interface RejectRequest {
  reason?: string;
}

// ---------- Admin Content ----------

export interface TributeResponse {
  id: number;
  memorialId: number;
  userId: number;
  content: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GuestbookResponse {
  id: number;
  memorialId: number;
  userId: number;
  authorName: string;
  content: string;
  isApproved: boolean;
}

// ---------- Admin Announcement ----------

export interface AnnouncementCreateRequest {
  title: string;
  content: string;
  isPinned?: boolean;
}

export interface AnnouncementUpdateRequest {
  title?: string;
  content?: string;
  isPinned?: boolean;
}

export interface AdminAnnouncementResponse {
  id: number;
  title: string;
  content: string;
  authorId: number;
  isPinned: boolean;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------- Admin Dashboard ----------

export interface SystemStatsResponse {
  users: number;
  memorials: number;
  tributes: number;
  offerings: number;
  guestbooks: number;
}

export interface ActiveItemResponse {
  id: number;
  count: number;
}

// ---------- Admin Audit Logs ----------

export interface AdminAuditLogResponse {
  id: number;
  createdAt: string;
  action: AuditAction;
  targetType: string;
  targetId: number;
  userId: number;
  ipAddress: string;
  userAgent: string;
  details: Record<string, unknown>;
}

export interface DlqReprocessResponse {
  requested: number;
  fetched: number;
  requeued: number;
  deleted: number;
  failed: number;
}
