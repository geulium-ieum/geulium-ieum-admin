import Link from "next/link";
import { InboxIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background px-4 py-24 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-surface-muted text-muted-foreground">
        <InboxIcon className="size-6" />
      </span>
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-foreground">페이지를 찾을 수 없습니다</h1>
        <p className="text-sm text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
      >
        대시보드로 이동
      </Link>
    </div>
  );
}
