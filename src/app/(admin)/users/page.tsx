import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, RoleBadge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockUsers } from "@/lib/mock/users";
import { toSlice } from "@/lib/mock/slice";

export default async function UsersPage(props: PageProps<"/users">) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page ?? 0) || 0;
  const slice = toSlice(mockUsers, { page, size: 10 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="사용자 관리"
        description="가입한 사용자를 조회하고 상태·역할을 관리하세요."
      />

      <div className="rounded-2xl border border-border bg-surface">
        {slice.content.length === 0 ? (
          <EmptyState title="사용자가 없습니다" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">이름</th>
                  <th className="px-5 py-3 font-medium">이메일</th>
                  <th className="px-5 py-3 font-medium">역할</th>
                  <th className="px-5 py-3 font-medium">상태</th>
                  <th className="px-5 py-3 font-medium">마지막 로그인</th>
                  <th className="px-5 py-3 font-medium">가입일</th>
                  <th className="px-5 py-3 font-medium text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {slice.content.map((user) => (
                  <tr key={user.id} className="align-middle">
                    <td className="px-5 py-3 font-medium text-foreground">
                      <Link href={`/users/${user.id}`} className="hover:text-accent">
                        {user.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-5 py-3">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={user.isActive ? "success" : "neutral"}>
                        {user.isActive ? "활성" : "비활성"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {user.lastLoginAt.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {user.createdAt.slice(0, 10)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1.5">
                        <Button size="sm" variant="secondary">
                          {user.isActive ? "비활성화" : "활성화"}
                        </Button>
                        <LinkButton size="sm" variant="ghost" href={`/users/${user.id}`}>
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
          basePath="/users"
        />
      </div>
    </div>
  );
}
