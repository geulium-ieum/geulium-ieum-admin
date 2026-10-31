import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { TributeSortField } from "@/types/api";
import { getAccessToken } from "@/lib/server/auth";
import { tributeService } from "@/lib/service/tribute";
import { SortableTh } from "@/components/ui/SortableTh";

const SORTABLE_FIELDS: TributeSortField[] = ["content", "memorialId", "userId", "isPublic", "createdAt"];

export default async function TributesPage(props: PageProps<"/content/tributes">) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, Math.floor(Number(searchParams.page ?? 1)) || 1)
  const size = Number(searchParams.size ?? 20) || 20
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : undefined
  const [sortFieldParam, sortDirectionParam] = sort ? sort.split(",") : []
  const sortField = SORTABLE_FIELDS.find((field) => field === sortFieldParam)
  const sortDirection = (["asc", "desc"] as const).find((direction) => direction === sortDirectionParam)
  const currentSort = sortField && sortDirection ? { field: sortField, direction: sortDirection } : undefined
  const token = await getAccessToken()
  const tributeResponse = await tributeService.get.list({
    token: token ?? "",
    searchParams: {
      page: page - 1,
      size,
      sort: currentSort && [currentSort.field, currentSort.direction]
    }
  })
  const sizeParams: Record<string, string> =
    typeof searchParams.size === "string" ? { size: searchParams.size } : {}
  const sortProps = {
    currentField: currentSort?.field,
    currentDirection: currentSort?.direction,
    basePath: "/content/tributes",
    extraParams: sizeParams,
  }
  // 페이지를 이동해도 정렬 기준과 페이지 크기를 유지한다.
  const paginationParams = {
    ...sizeParams,
    ...(currentSort ? { sort: `${currentSort.field},${currentSort.direction}` } : {}),
  }

  return (
    <div className="rounded-2xl border border-border bg-surface">
      {tributeResponse.content.length === 0 ? (
        <EmptyState title="추모글이 없습니다" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <SortableTh field="content" {...sortProps}>내용</SortableTh>
                <SortableTh field="memorial" {...sortProps}>추모관</SortableTh>
                <SortableTh field="user" {...sortProps}>작성자</SortableTh>
                <SortableTh field="isPublic" {...sortProps}>공개</SortableTh>
                <SortableTh field="createdAt" {...sortProps}>작성일</SortableTh>
                <th className="px-5 py-3 font-medium text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tributeResponse.content.map((tribute) => (
                <tr key={tribute.id}>
                  <td className="max-w-xs truncate px-5 py-3 text-foreground">
                    {tribute.content}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    <Link href={`/memorials/${tribute.memorialId}`} className="hover:text-foreground">
                      #{tribute.memorialId}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    <Link href={`/users/${tribute.userId}`} className="hover:text-foreground">
                      #{tribute.userId}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge tone={tribute.isPublic ? "success" : "neutral"}>
                      {tribute.isPublic ? "공개" : "비공개"}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {tribute.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <Button size="sm" variant="destructive">
                        삭제
                      </Button>
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
        size={size}
        totalPages={tributeResponse.page.totalPages}
        totalElements={tributeResponse.page.totalElements}
        basePath="/content/tributes"
        extraParams={paginationParams}
      />
    </div>
  );
}
