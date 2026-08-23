import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockAnnouncements } from "@/lib/mock/announcements";

export default function AnnouncementsPage() {
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
        {mockAnnouncements.length === 0 ? (
          <EmptyState title="등록된 공지사항이 없습니다" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">제목</th>
                  <th className="px-5 py-3 font-medium">고정</th>
                  <th className="px-5 py-3 font-medium">상태</th>
                  <th className="px-5 py-3 font-medium">작성일</th>
                  <th className="px-5 py-3 font-medium text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockAnnouncements.map((a) => (
                  <tr key={a.id}>
                    <td className="px-5 py-3 font-medium text-foreground">
                      <Link href={`/announcements/${a.id}`} className="hover:text-accent">
                        {a.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      {a.isPinned ? <Badge tone="accent">고정</Badge> : null}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={a.isPublished ? "success" : "neutral"}>
                        {a.isPublished ? "발행됨" : "미발행"}
                      </Badge>
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
      </div>
    </div>
  );
}
