import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

const toneClasses: Record<Tone, string> = {
  neutral:
    "bg-surface-muted text-foreground/70 ring-1 ring-inset ring-border",
  accent: "bg-accent-soft text-accent ring-1 ring-inset ring-accent/20",
  success:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  warning:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  danger:
    "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-400/20",
  info: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-400/20",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

const roleTone: Record<string, Tone> = {
  SUPER_ADMIN: "accent",
  ADMIN: "info",
  USER: "neutral",
};

const roleLabel: Record<string, string> = {
  SUPER_ADMIN: "슈퍼 관리자",
  ADMIN: "관리자",
  USER: "일반회원",
};

export function RoleBadge({ role }: { role: string }) {
  return <Badge tone={roleTone[role] ?? "neutral"}>{roleLabel[role] ?? role}</Badge>;
}

const memorialStatusTone: Record<string, Tone> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECT: "danger",
  CANCEL: "neutral",
};

const memorialStatusLabel: Record<string, string> = {
  PENDING: "승인 대기",
  APPROVED: "승인됨",
  REJECT: "반려됨",
  CANCEL: "취소됨",
};

export function MemorialStatusBadge({ status }: { status: string }) {
  return (
    <Badge tone={memorialStatusTone[status] ?? "neutral"}>
      {memorialStatusLabel[status] ?? status}
    </Badge>
  );
}

const visibilityLabel: Record<string, string> = {
  PUBLIC: "전체 공개",
  PRIVATE: "비공개",
  FAMILY_ONLY: "가족 공개",
};

export function VisibilityBadge({ visibility }: { visibility: string }) {
  return <Badge tone="neutral">{visibilityLabel[visibility] ?? visibility}</Badge>;
}
