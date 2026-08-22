import Link from "next/link";
import { LockIcon } from "@/components/icons";

export default function Unauthorized() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background px-4 py-24 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-surface-muted text-muted-foreground">
        <LockIcon className="size-6" />
      </span>
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-foreground">401 · 로그인이 필요합니다</h1>
        <p className="text-sm text-muted-foreground">
          이 페이지를 보려면 관리자 계정으로 로그인해 주세요.
        </p>
      </div>
      <Link
        href="/login"
        className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
      >
        로그인하러 가기
      </Link>
    </div>
  );
}
