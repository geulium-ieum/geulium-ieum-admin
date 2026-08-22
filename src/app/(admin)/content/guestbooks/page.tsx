import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockGuestbooks } from "@/lib/mock/content";
import { toSlice } from "@/lib/mock/slice";

export default async function GuestbooksPage(props: PageProps<"/content/guestbooks">) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page ?? 0) || 0;
  const slice = toSlice(mockGuestbooks, { page, size: 10 });

  return (
    <div className="rounded-2xl border border-border bg-surface">
      {slice.content.length === 0 ? (
        <EmptyState title="방명록이 없습니다" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">작성자</th>
                <th className="px-5 py-3 font-medium">내용</th>
                <th className="px-5 py-3 font-medium">추모관</th>
                <th className="px-5 py-3 font-medium">승인 상태</th>
                <th className="px-5 py-3 font-medium text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {slice.content.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-5 py-3 font-medium text-foreground">{entry.authorName}</td>
                  <td className="max-w-xs truncate px-5 py-3 text-foreground">{entry.content}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    <Link href={`/memorials/${entry.memorialId}`} className="hover:text-accent">
                      #{entry.memorialId}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={entry.isApproved ? "success" : "warning"}>
                      {entry.isApproved ? "승인됨" : "승인 대기"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      {!entry.isApproved ? (
                        <Button size="sm" variant="secondary">
                          승인
                        </Button>
                      ) : null}
                      <Button size="sm" variant="danger">
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
        page={slice.number}
        first={slice.first}
        last={slice.last}
        numberOfElements={slice.numberOfElements}
        size={slice.size}
        basePath="/content/guestbooks"
      />
    </div>
  );
}
