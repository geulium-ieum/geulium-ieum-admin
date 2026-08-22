import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, BookIcon, FlameIcon, MessageIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { RoleBadge, Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { mockUserDetails } from "@/lib/mock/users";

export default async function UserDetailPage(props: PageProps<"/users/[id]">) {
  const { id } = await props.params;
  const user = mockUserDetails[Number(id)];
  if (!user) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/users"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          사용자 목록
        </Link>
        <PageHeader title={user.name} description={user.email} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-start gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-surface-muted text-lg font-semibold text-foreground">
                {user.name.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-semibold text-foreground">{user.name}</p>
                  <RoleBadge role={user.role} />
                  <Badge tone={user.isActive ? "success" : "neutral"}>
                    {user.isActive ? "활성" : "비활성"}
                  </Badge>
                </div>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                  <div className="flex justify-between gap-4 sm:justify-start">
                    <dt className="text-muted-foreground">이메일</dt>
                    <dd className="text-foreground">{user.email}</dd>
                  </div>
                  <div className="flex justify-between gap-4 sm:justify-start">
                    <dt className="text-muted-foreground">휴대전화</dt>
                    <dd className="text-foreground">{user.phone}</dd>
                  </div>
                  <div className="flex justify-between gap-4 sm:justify-start">
                    <dt className="text-muted-foreground">가입일</dt>
                    <dd className="text-foreground">{user.createdAt.slice(0, 10)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 sm:justify-start">
                    <dt className="text-muted-foreground">마지막 로그인</dt>
                    <dd className="text-foreground">
                      {user.lastLoginAt.slice(0, 16).replace("T", " ")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <MessageIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">작성 추모글</p>
                <p className="text-base font-semibold text-foreground">{user.tributeCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <FlameIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">헌화·분향</p>
                <p className="text-base font-semibold text-foreground">{user.offeringCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <BookIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">방명록</p>
                <p className="text-base font-semibold text-foreground">{user.guestbookCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">역할 변경</h2>
            <p className="mb-3 text-xs text-muted-foreground">
              SUPER_ADMIN 계정만 역할을 변경할 수 있습니다.
            </p>
            <Field label="역할" htmlFor="role">
              <select id="role" name="role" defaultValue={user.role} className={inputClass}>
                <option value="USER">일반회원</option>
                <option value="ADMIN">관리자</option>
                <option value="SUPER_ADMIN">슈퍼 관리자</option>
              </select>
            </Field>
            <Button variant="primary" className="mt-3 w-full">
              역할 저장
            </Button>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-surface p-5 dark:border-rose-500/20">
            <h2 className="mb-1 text-sm font-semibold text-foreground">위험 구역</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              계정 상태 변경 및 삭제는 신중하게 진행하세요.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="secondary" className="w-full">
                {user.isActive ? "계정 비활성화" : "계정 활성화"}
              </Button>
              <Button variant="danger" className="w-full">
                계정 삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
