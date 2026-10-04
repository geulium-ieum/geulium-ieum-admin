import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

const toneProps: Record<
  Tone,
  { variant: ComponentProps<typeof Badge>["variant"]; className?: string }
> = {
  neutral: { variant: "secondary" },
  accent: { variant: "default" },
  danger: { variant: "destructive" },
  success: {
    variant: "outline",
    className:
      "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  warning: {
    variant: "outline",
    className:
      "border-amber-600/20 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-400",
  },
  info: {
    variant: "outline",
    className:
      "border-sky-600/20 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-500/10 dark:text-sky-400",
  },
};

export function StatusBadge({
  tone = "neutral",
  className,
  ...props
}: Omit<ComponentProps<typeof Badge>, "variant"> & { tone?: Tone }) {
  const { variant, className: toneClass } = toneProps[tone];
  return <Badge variant={variant} className={cn(toneClass, className)} {...props} />;
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
  return <StatusBadge tone={roleTone[role] ?? "neutral"}>{roleLabel[role] ?? role}</StatusBadge>;
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
    <StatusBadge tone={memorialStatusTone[status] ?? "neutral"}>
      {memorialStatusLabel[status] ?? status}
    </StatusBadge>
  );
}

const visibilityLabel: Record<string, string> = {
  PUBLIC: "전체 공개",
  PRIVATE: "비공개",
  FAMILY_ONLY: "가족 공개",
};

export function VisibilityBadge({ visibility }: { visibility: string }) {
  return <StatusBadge tone="neutral">{visibilityLabel[visibility] ?? visibility}</StatusBadge>;
}
