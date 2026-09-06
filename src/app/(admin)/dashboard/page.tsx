import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { RankedList } from "@/components/admin/RankedList";
// import { RoleBadge } from "@/components/ui/Badge";
import {
  BookIcon,
  FlameIcon,
  FlowerIcon,
  MessageIcon,
  UsersIcon,
} from "@/components/icons";
import { mockActiveMemorials, mockActiveUsers, mockSystemStats } from "@/lib/mock/dashboard";
import { mockUsers } from "@/lib/mock/users";
import { mockMemorials } from "@/lib/mock/memorials";

export default function DashboardPage() {
  const recentUsers = mockUsers.slice(0, 5);

  const activeUsers = mockActiveUsers.map((item) => {
    const user = mockUsers.find((u) => u.id === item.id);
    return {
      id: item.id,
      label: user?.name ?? `사용자 #${item.id}`,
      sublabel: user?.email,
      count: item.count,
    };
  });

  const activeMemorials = mockActiveMemorials.map((item) => {
    const memorial = mockMemorials.find((m) => m.id === item.id);
    return {
      id: item.id,
      label: memorial?.deceasedName ?? `추모관 #${item.id}`,
      sublabel: memorial?.location || undefined,
      count: item.count,
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="대시보드"
        description="서비스 전체 현황을 한눈에 확인하세요."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="총 사용자" value={mockSystemStats.users} icon={UsersIcon} />
        <StatCard label="총 추모관" value={mockSystemStats.memorials} icon={FlowerIcon} />
        <StatCard label="총 추모글" value={mockSystemStats.tributes} icon={MessageIcon} />
        <StatCard label="총 헌화·분향" value={mockSystemStats.offerings} icon={FlameIcon} />
        <StatCard label="총 방명록" value={mockSystemStats.guestbooks} icon={BookIcon} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">최근 가입 사용자</h2>
            <Link href="/users" className="text-xs font-medium text-accent hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="px-5 py-2.5 font-medium">이름</th>
                  <th className="px-5 py-2.5 font-medium">이메일</th>
                  <th className="px-5 py-2.5 font-medium">역할</th>
                  <th className="px-5 py-2.5 font-medium">가입일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-2.5 font-medium text-foreground">
                      <Link href={`/users/${user.id}`} className="hover:text-accent">
                        {user.name}
                      </Link>
                    </td>
                    <td className="px-5 py-2.5 text-muted-foreground">{user.email}</td>
                    <td className="px-5 py-2.5">
                      {/* <RoleBadge role={user.role} /> */}
                    </td>
                    <td className="px-5 py-2.5 text-muted-foreground">
                      {user.createdAt.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              활동 많은 사용자
              <span className="ml-1.5 font-normal text-muted-foreground">(최근 30일)</span>
            </h2>
            <RankedList items={activeUsers} unit="건" />
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              활동 많은 추모관
              <span className="ml-1.5 font-normal text-muted-foreground">(최근 30일)</span>
            </h2>
            <RankedList items={activeMemorials} unit="건" />
          </div>
        </div>
      </div>
    </div>
  );
}
