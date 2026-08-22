import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

/**
 * Slice 기반 페이지네이션 (totalPages를 알 수 없으므로 이전/다음만 제공).
 * href는 서버 컴포넌트에서 ?page= 쿼리로 이동하는 순수 링크 방식.
 */
export function Pagination({
  page,
  first,
  last,
  numberOfElements,
  size,
  basePath,
  extraParams,
}: {
  page: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  basePath: string;
  /** page 외에 유지해야 할 쿼리 파라미터 (예: 탭 상태) */
  extraParams?: Record<string, string>;
}) {
  const hrefFor = (targetPage: number) => {
    const params = new URLSearchParams(extraParams);
    params.set("page", String(targetPage));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-6">
      <p className="text-sm text-muted-foreground">
        {page + 1}페이지 · {numberOfElements}건 표시 (페이지당 {size}건)
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={hrefFor(Math.max(0, page - 1))}
          aria-disabled={first}
          className={`inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors ${
            first
              ? "pointer-events-none text-muted-foreground/50"
              : "text-foreground hover:bg-surface-muted"
          }`}
        >
          <ChevronLeftIcon className="size-4" />
          이전
        </Link>
        <Link
          href={hrefFor(page + 1)}
          aria-disabled={last}
          className={`inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors ${
            last
              ? "pointer-events-none text-muted-foreground/50"
              : "text-foreground hover:bg-surface-muted"
          }`}
        >
          다음
          <ChevronRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}
