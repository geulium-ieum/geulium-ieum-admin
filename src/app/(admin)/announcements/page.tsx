import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnnouncementSortField } from "@/types/api";
import { announcementService } from "@/lib/service/announcement";
import { SortableTh } from "@/components/ui/SortableTh";
import { Pagination } from "@/components/ui/Pagination";

const SORTABLE_FIELDS: AnnouncementSortField[] = ["title", "content", "isPinned", "isPublished", "updatedAt"];

export default async function AnnouncementsPage(props: PageProps<"/announcements">) {
  // TODO: Pagination 수정
  const searchParams = await props.searchParams;
  const page = Math.max(1, Math.floor(Number(searchParams.page ?? 1)) || 1)
  const size = Number(searchParams.size ?? 20) || 20
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : undefined
  const [sortFieldParam, sortDirectionParam] = sort ? sort.split(",") : []
  const sortField = SORTABLE_FIELDS.find((field) => field === sortFieldParam)
  const sortDirection = (["asc", "desc"] as const).find((direction) => direction === sortDirectionParam)
  const currentSort = sortField && sortDirection ? { field: sortField, direction: sortDirection } : undefined
  const announcementResponse = await announcementService.get.list({
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
    basePath: "/announcements",
    extraParams: sizeParams,
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="공지사항"
        description="서비스 공지사항을 작성하고 발행하세요."
        actions={
          <Link href="/announcements/new">
            <Button>
              새 공지 작성
            </Button>
          </Link>
        }
      />

      <div className="rounded-2xl border border-border bg-surface">
        {announcementResponse.content.length === 0 ? (
          <EmptyState title="등록된 공지사항이 없습니다" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <SortableTh field="title" {...sortProps}>제목</SortableTh>
                  <SortableTh field="isPinned" {...sortProps}>고정</SortableTh>
                  <SortableTh field="isPublished" {...sortProps}>상태</SortableTh>
                  <SortableTh field="createdAt" {...sortProps}>작성일</SortableTh>
                  <th className="px-5 py-3 font-medium text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {announcementResponse.content.map((a) => (
                  <tr key={a.id}>
                    <td className="px-5 py-3 font-medium text-foreground">
                      <Link href={`/announcements/${a.id}`} className="hover:underline">
                        {a.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      {a.isPinned ? <StatusBadge tone="accent">고정</StatusBadge> : null}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge tone={a.isPublished ? "success" : "neutral"}>
                        {a.isPublished ? "발행됨" : "미발행"}
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {a.createdAt.slice(0, 10)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1.5">
                        <Link href={`/announcements/${a.id}`}>
                          <Button size="sm" variant="ghost">
                            수정
                          </Button>
                        </Link>
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
          first={announcementResponse.first}
          last={announcementResponse.last}
          size={10}
          basePath="/announcements"
        />
      </div>
    </div>
  );
}
