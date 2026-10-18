import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { MemorialStatusBadge, VisibilityBadge } from "@/components/admin/StatusBadge";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { SortableTh } from "@/components/ui/SortableTh";
import { EmptyState } from "@/components/ui/EmptyState";
import { MemorialSortField } from "@/types/api";
import { getAccessToken } from "@/lib/server/auth";
import { memorialService } from "@/lib/service/memorial";

const tabs = [
  { key: "all", label: "전체", href: "/memorials" },
  { key: "pending", label: "승인 대기", href: "/memorials?tab=pending" },
] as const;

const SORTABLE_FIELDS: MemorialSortField[] = ["id", "deceasedName", "birthDate", "deathDate", "location", "biography", "photoUrl", "visibility", "status", "createdBy", "updatedBy", "createdAt", "updatedAt"];

export default async function MemorialsPage(props: PageProps<"/memorials">) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, Math.floor(Number(searchParams.page ?? 1)) || 1)
  const size = Number(searchParams.size ?? 20) || 20
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : undefined
  const [sortFieldParam, sortDirectionParam] = sort ? sort.split(",") : []
  const sortField = SORTABLE_FIELDS.find((field) => field === sortFieldParam)
  const sortDirection = (["asc", "desc"] as const).find((direction) => direction === sortDirectionParam)
  const currentSort = sortField && sortDirection ? { field: sortField, direction: sortDirection } : undefined
  const token = await getAccessToken()
  const memorialResponse = await memorialService.get.list({
    token: token ?? "",
    searchParams: {
      page: page - 1,
      size,
      sort: currentSort && [currentSort.field, currentSort.direction]
    }
  });
  const pendingMemorials = {
    ...memorialResponse,
    content: memorialResponse.content.filter(el => el.status === "PENDING")
  }
  const sizeParams: Record<string, string> =
    typeof searchParams.size === "string" ? { size: searchParams.size } : {}
  const tab = searchParams.tab === "pending" ? "pending" : "all";
  const tabParams: Record<string, string> = tab === "pending" ? { tab } : {}
  const sortProps = {
    currentField: currentSort?.field,
    currentDirection: currentSort?.direction,
    basePath: "/memorials",
    extraParams: { ...sizeParams, ...tabParams },
  }
  // 페이지를 이동해도 탭, 정렬 기준, 페이지 크기를 유지한다.
  const paginationParams = {
    ...sizeParams,
    ...tabParams,
    ...(currentSort ? { sort: `${currentSort.field},${currentSort.direction}` } : {}),
  }
  const source = tab === "pending" ? pendingMemorials : memorialResponse;

  return (
    <div className="space-y-6">
      <PageHeader
        title="추모관 관리"
        description="등록된 추모관을 조회하고 승인·반려를 처리하세요."
      />

      <div className="flex gap-1 border-b border-border">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "border-b-2 border-accent"
                : "text-muted-foreground"
            }`}
          >
            {t.label}
            {t.key === "pending" ? (
              <span className="ml-1.5 rounded-full bg-surface-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                {pendingMemorials.content.length}
              </span>
            ) : null}
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface">
        {source.content.length === 0 ? (
          <EmptyState title="추모관이 없습니다" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <SortableTh field="deceasedName" {...sortProps}>고인명</SortableTh>
                  <SortableTh field="status" {...sortProps}>상태</SortableTh>
                  <SortableTh field="visibility" {...sortProps}>공개범위</SortableTh>
                  <SortableTh field="createdBy" {...sortProps}>생성자 ID</SortableTh>
                  <SortableTh field="createdAt" {...sortProps}>등록일</SortableTh>
                  <th className="px-5 py-3 font-medium text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {source.content.map((memorial) => (
                  <tr key={memorial.id}>
                    <td className="px-5 py-3 font-medium text-foreground">
                      <Link href={`/memorials/${memorial.id}`}>
                        {memorial.deceasedName}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <MemorialStatusBadge status={memorial.status} />
                    </td>
                    <td className="px-5 py-3">
                      <VisibilityBadge visibility={memorial.visibility} />
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">#{memorial.createdBy}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {memorial.createdAt.slice(0, 10)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1.5">
                        {memorial.status === "PENDING" ? (
                          <>
                            <Button size="sm" variant="secondary">
                              승인
                            </Button>
                            <Button size="sm" variant="destructive">
                              반려
                            </Button>
                          </>
                        ) : null}
                        <Link href={`/memorials/${memorial.id}`} className={buttonVariants({ size: "sm", variant: "ghost" })}>
                          상세
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination
          page={page}
          first={source.first}
          last={source.last}
          size={source.size}
          basePath="/memorials"
          extraParams={paginationParams}
        />
      </div>
    </div>
  );
}
