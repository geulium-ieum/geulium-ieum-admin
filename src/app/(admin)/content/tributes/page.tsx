import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockTributes } from "@/lib/mock/content";
import { toSlice } from "@/lib/mock/slice";

export default async function TributesPage(props: PageProps<"/content/tributes">) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page ?? 0) || 0;
  const slice = toSlice(mockTributes, { page, size: 10 });

  return (
    <div className="rounded-2xl border border-border bg-surface">
      {slice.content.length === 0 ? (
        <EmptyState title="추모글이 없습니다" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">내용</th>
                <th className="px-5 py-3 font-medium">추모관</th>
                <th className="px-5 py-3 font-medium">작성자</th>
                <th className="px-5 py-3 font-medium">공개</th>
                <th className="px-5 py-3 font-medium">작성일</th>
                <th className="px-5 py-3 font-medium text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {slice.content.map((tribute) => (
                <tr key={tribute.id}>
                  <td className="max-w-xs truncate px-5 py-3 text-foreground">
                    {tribute.content}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    <Link href={`/memorials/${tribute.memorialId}`} className="hover:text-accent">
                      #{tribute.memorialId}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    <Link href={`/users/${tribute.userId}`} className="hover:text-accent">
                      #{tribute.userId}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={tribute.isPublic ? "success" : "neutral"}>
                      {tribute.isPublic ? "공개" : "비공개"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {tribute.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
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
        basePath="/content/tributes"
      />
    </div>
  );
}
