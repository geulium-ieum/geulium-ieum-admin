import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { MemorialStatusBadge, VisibilityBadge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockMemorials, mockPendingMemorials } from "@/lib/mock/memorials";
import { toSlice } from "@/lib/mock/slice";

const tabs = [
  { key: "all", label: "전체", href: "/memorials" },
  { key: "pending", label: "승인 대기", href: "/memorials?tab=pending" },
] as const;

export default async function MemorialsPage(props: PageProps<"/memorials">) {
  const searchParams = await props.searchParams;
  const tab = searchParams.tab === "pending" ? "pending" : "all";
  const page = Number(searchParams.page ?? 0) || 0;
  const source = tab === "pending" ? mockPendingMemorials : mockMemorials;
  const slice = toSlice(source, { page, size: 10 });

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
                ? "border-b-2 border-accent text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {t.key === "pending" ? (
              <span className="ml-1.5 rounded-full bg-surface-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                {mockPendingMemorials.length}
              </span>
            ) : null}
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface">
        {slice.content.length === 0 ? (
          <EmptyState title="추모관이 없습니다" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">고인명</th>
                  <th className="px-5 py-3 font-medium">상태</th>
                  <th className="px-5 py-3 font-medium">공개범위</th>
                  <th className="px-5 py-3 font-medium">생성자 ID</th>
                  <th className="px-5 py-3 font-medium">등록일</th>
                  <th className="px-5 py-3 font-medium text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {slice.content.map((memorial) => (
                  <tr key={memorial.id}>
                    <td className="px-5 py-3 font-medium text-foreground">
                      <Link href={`/memorials/${memorial.id}`} className="hover:text-accent">
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
                            <Button size="sm" variant="danger">
                              반려
                            </Button>
                          </>
                        ) : null}
                        <LinkButton size="sm" variant="ghost" href={`/memorials/${memorial.id}`}>
                          상세
                        </LinkButton>
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
          basePath="/memorials"
          extraParams={tab === "pending" ? { tab: "pending" } : undefined}
        />
      </div>
    </div>
  );
}
