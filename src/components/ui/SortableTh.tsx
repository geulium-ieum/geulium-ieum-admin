import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons";
import type { SortDirection } from "@/types/api";

/**
 * 클릭 시 해당 컬럼으로 정렬하고, 같은 컬럼을 다시 클릭하면 정렬 방향을 뒤집는 테이블 헤더.
 * 정렬 상태는 ?sort=field,direction 쿼리로 유지되는 순수 링크 방식 (서버 컴포넌트).
 */
export function SortableTh<F extends string>({
  field,
  currentField,
  currentDirection,
  basePath,
  extraParams,
  className = "",
  children,
}: {
  field: F;
  currentField?: F;
  currentDirection?: SortDirection;
  basePath: string;
  /** sort/page 외에 유지해야 할 쿼리 파라미터 (예: size) */
  extraParams?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
}) {
  const isActive = currentField === field;
  const nextDirection: SortDirection =
    isActive && currentDirection === "asc" ? "desc" : "asc";

  // 정렬 기준이 바뀌면 첫 페이지부터 다시 보도록 page는 유지하지 않는다.
  const params = new URLSearchParams(extraParams);
  params.set("sort", `${field},${nextDirection}`);

  return (
    <th
      className={`px-5 py-3 font-medium ${className}`}
      aria-sort={
        isActive ? (currentDirection === "asc" ? "ascending" : "descending") : "none"
      }
    >
      <Link
        href={`${basePath}?${params.toString()}`}
        className={`inline-flex items-center gap-1 transition-colors hover:text-foreground ${
          isActive ? "text-foreground" : ""
        }`}
      >
        {children}
        {isActive && (
          <ChevronDownIcon
            className={`size-3.5 ${currentDirection === "asc" ? "rotate-180" : ""}`}
          />
        )}
      </Link>
    </th>
  );
}
