import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, BookIcon, FlameIcon, MessageIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { RoleBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Label } from "@/components/ui/label";
import { userService } from "@/lib/service/user";
import { getAccessToken } from "@/lib/server/auth";
import { HTTPError } from "ky";
import ChangeRole from "./_organisms/ChangeRole";
import ManageAccount from "./_organisms/ManageAccount";

export default async function UserDetailPage(props: PageProps<"/users/[id]">) {
  const { id } = await props.params;
  let user;
  try {
    const token = await getAccessToken();
    user = await userService.get.user({ id, token: token ?? "" });
  } catch (error) {
    if (error instanceof HTTPError) {
      notFound();
    }
  }

  if (!user) return <></>;
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
                  <StatusBadge tone={user.isActive ? "success" : "neutral"}>
                    {user.isActive ? "활성" : "비활성"}
                  </StatusBadge>
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
                      {user.lastLoginAt && user.lastLoginAt.slice(0, 16).replace("T", " ")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
                <MessageIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">작성 추모글</p>
                <p className="text-base font-semibold text-foreground">{user.tributeCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
                <FlameIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">헌화·분향</p>
                <p className="text-base font-semibold text-foreground">{user.offeringCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
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
          <ChangeRole user={user} />
          <ManageAccount user={user} />
        </div>
      </div>
    </div>
  );
}
