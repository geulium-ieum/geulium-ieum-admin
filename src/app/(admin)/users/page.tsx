import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { RoleBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { userService } from "@/lib/service/user";
import { getAccessToken } from "@/lib/server/auth";
import { SortableTh } from "@/components/ui/SortableTh";
import type { UserSortField } from "@/types/api";

const SORTABLE_FIELDS: UserSortField[] = ["name", "email", "role", "isActive", "lastLoginAt", "createdAt"];

export default async function UsersPage(props: PageProps<"/users">) {
  const searchParams = await props.searchParams
  // URL의 page는 1부터 시작하고, API(Spring)는 0부터 시작한다.
  const page = Math.max(1, Math.floor(Number(searchParams.page ?? 1)) || 1)
  const size = Number(searchParams.size ?? 20) || 20
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : undefined
  const [sortFieldParam, sortDirectionParam] = sort ? sort.split(",") : []
  const sortField = SORTABLE_FIELDS.find((field) => field === sortFieldParam)
  const sortDirection = (["asc", "desc"] as const).find((direction) => direction === sortDirectionParam)
  const currentSort = sortField && sortDirection ? { field: sortField, direction: sortDirection } : undefined
  const token = await getAccessToken();
  const userResponse = await userService.get.list({
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
    basePath: "/users",
    extraParams: sizeParams,
  }
  // 페이지를 이동해도 정렬 기준과 페이지 크기를 유지한다.
  const paginationParams = {
    ...sizeParams,
    ...(currentSort ? { sort: `${currentSort.field},${currentSort.direction}` } : {}),
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="사용자 관리"
        description="가입한 사용자를 조회하고 상태·역할을 관리하세요."
      />

      <div className="rounded-2xl border border-border bg-surface">
        {userResponse.content.length === 0 ? (
          <EmptyState title="사용자가 없습니다" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-205 text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <SortableTh field="name" {...sortProps}>이름</SortableTh>
                  <SortableTh field="email" {...sortProps}>이메일</SortableTh>
                  <SortableTh field="role" {...sortProps}>역할</SortableTh>
                  <SortableTh field="isActive" {...sortProps}>상태</SortableTh>
                  <SortableTh field="lastLoginAt" {...sortProps}>마지막 로그인</SortableTh>
                  <SortableTh field="createdAt" {...sortProps}>가입일</SortableTh>
                  <th className="px-5 py-3 font-medium text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {userResponse.content.map((user) => (
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
                      <StatusBadge tone={user.isActive ? "success" : "neutral"}>
                        {user.isActive ? "활성" : "비활성"}
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {user.lastLoginAt && user.lastLoginAt.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {user.createdAt.slice(0, 10)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1.5">
                        <Button size="sm" variant="secondary">
                          {user.isActive ? "비활성화" : "활성화"}
                        </Button>
                        <Link href={`/users/${user.id}`}>
                          <Button size="sm" variant="ghost">
                            상세
                          </Button>
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
          size={size}
          totalPages={userResponse.page.totalPages}
          totalElements={userResponse.page.totalElements}
          basePath="/users"
          extraParams={paginationParams}
        />
      </div>
    </div>
  );
}
