import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

const WINDOW_SIZE = 5;

/**
 * 페이지네이션. href는 서버 컴포넌트에서 ?page= 쿼리로 이동하는 순수 링크 방식이며 page는 1부터 시작한다.
 * - Slice 응답: first/last 로 이전/다음만 제공한다.
 * - Page 응답: totalPages(+totalElements)를 넘기면 페이지 번호 링크까지 제공한다.
 */
export function Pagination({
  page,
  first,
  last,
  size,
  basePath,
  extraParams,
  totalPages,
  totalElements,
}: {
  page: number;
  first?: boolean;
  last?: boolean;
  size: number;
  basePath: string;
  /** page 외에 유지해야 할 쿼리 파라미터 (예: 탭 상태, 정렬) */
  extraParams?: Record<string, string>;
  totalPages?: number;
  totalElements?: number;
}) {
  const hasTotal = totalPages !== undefined;
  const isFirst = first ?? page <= 1;
  const isLast = last ?? (hasTotal ? page >= totalPages : false);

  const hrefFor = (targetPage: number) => {
    const params = new URLSearchParams(extraParams);
    params.set("page", String(targetPage));
    return `${basePath}?${params.toString()}`;
  };

  // 현재 페이지를 가운데에 두는 번호 윈도우 (양 끝에서는 윈도우 크기를 유지하도록 밀어준다)
  const pageNumbers: number[] = [];
  if (hasTotal) {
    const start = Math.max(1, Math.min(page - Math.floor(WINDOW_SIZE / 2), totalPages - WINDOW_SIZE + 1));
    const end = Math.min(totalPages, start + WINDOW_SIZE - 1);
    for (let n = start; n <= end; n++) pageNumbers.push(n);
  }

  const buttonClass = (disabled: boolean) =>
    `inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors ${
      disabled
        ? "pointer-events-none text-muted-foreground/50"
        : "text-foreground hover:bg-surface-muted"
    }`;

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-6">
      <p className="text-sm text-muted-foreground">
        {hasTotal
          ? `${totalElements !== undefined ? `총 ${totalElements}건 · ` : ""}${page} / ${Math.max(totalPages, 1)} 페이지`
          : `${page}페이지`}{" "}
        (페이지당 {size}건)
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={hrefFor(Math.max(1, page - 1))}
          aria-disabled={isFirst}
          className={buttonClass(isFirst)}
        >
          <ChevronLeftIcon className="size-4" />
          이전
        </Link>
        {pageNumbers.map((n) => (
          <Link
            key={n}
            href={hrefFor(n)}
            aria-current={n === page ? "page" : undefined}
            className={`hidden min-w-8 justify-center rounded-lg border px-2 py-1.5 text-center text-sm font-medium transition-colors sm:inline-flex ${
              n === page
                ? "pointer-events-none border-accent bg-accent-soft text-foreground"
                : "border-border text-foreground hover:bg-surface-muted"
            }`}
          >
            {n}
          </Link>
        ))}
        <Link
          href={hrefFor(page + 1)}
          aria-disabled={isLast}
          className={buttonClass(isLast)}
        >
          다음
          <ChevronRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}
