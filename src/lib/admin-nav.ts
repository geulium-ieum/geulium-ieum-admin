import type { ComponentType, SVGProps } from "react";
import {
  FlowerIcon,
  GridIcon,
  MegaphoneIcon,
  ScrollIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** 이 prefix로 시작하는 경로면 활성 상태로 표시 */
  match: string;
}

export const adminNav: AdminNavItem[] = [
  { label: "대시보드", href: "/dashboard", icon: GridIcon, match: "/dashboard" },
  { label: "사용자 관리", href: "/users", icon: UsersIcon, match: "/users" },
  { label: "추모관 관리", href: "/memorials", icon: FlowerIcon, match: "/memorials" },
  {
    label: "콘텐츠 모니터링",
    href: "/content/tributes",
    icon: ShieldIcon,
    match: "/content",
  },
  { label: "공지사항", href: "/announcements", icon: MegaphoneIcon, match: "/announcements" },
  { label: "감사 로그", href: "/audit-logs", icon: ScrollIcon, match: "/audit-logs" },
];
