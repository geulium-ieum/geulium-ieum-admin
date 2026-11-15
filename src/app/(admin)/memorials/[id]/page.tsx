import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, FlameIcon, MessageIcon, UsersIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { MemorialStatusBadge, VisibilityBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/textarea";
import { HTTPError } from "ky";
import { getAccessToken } from "@/lib/server/auth";
import { memorialService } from "@/lib/service/memorial";
import Action from "./_organisms/Action";

export default async function MemorialDetailPage(props: PageProps<"/memorials/[id]">) {
  // TODO: admin/memorial/${id} response 데이터 추가 요청 필요
  const { id } = await props.params;
  let memorial;
  try {
    const token = await getAccessToken();
    memorial = await memorialService.get.memorial({ id, token: token ?? "" });
  } catch (error) {
    console.error(error)
    if (error instanceof HTTPError) {
      notFound();
    }
  }

  if (!memorial) return <></>;
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/memorials"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          추모관 목록
        </Link>
        <PageHeader
          title={memorial.deceasedName}
          description={`${memorial.birthDate} ~ ${memorial.deathDate}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {/* <MemorialStatusBadge status={memorial.status} /> */}
              <VisibilityBadge visibility={memorial.visibility} />
            </div>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-4 sm:justify-start">
                <dt className="text-muted-foreground">장소</dt>
                {/* <dd className="text-foreground">{memorial.location || "미등록"}</dd> */}
              </div>
              <div className="flex justify-between gap-4 sm:justify-start">
                <dt className="text-muted-foreground">등록일</dt>
                {/* <dd className="text-foreground">{memorial.createdAt.slice(0, 10)}</dd> */}
              </div>
              <div className="flex justify-between gap-4 sm:justify-start">
                <dt className="text-muted-foreground">등록자 ID</dt>
                {/* <dd className="text-foreground">#{memorial.createdBy}</dd> */}
              </div>
              <div className="flex justify-between gap-4 sm:justify-start">
                <dt className="text-muted-foreground">최종 수정</dt>
                {/* <dd className="text-foreground">{memorial.updatedAt.slice(0, 10)}</dd> */}
              </div>
            </dl>
            <div className="mt-4 border-t border-border pt-4">
              <p className="mb-1 text-xs font-medium text-muted-foreground">소개</p>
              <p className="text-sm leading-relaxed text-foreground">{memorial.biography}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
                <MessageIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">추모글</p>
                {/* <p className="text-base font-semibold text-foreground">{stats.tributeCount}</p> */}
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
                <FlameIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">헌화·분향</p>
                {/* <p className="text-base font-semibold text-foreground">{stats.offeringCount}</p> */}
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
                <UsersIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">가족 구성원</p>
                {/* <p className="text-base font-semibold text-foreground">{stats.memberCount}</p> */}
              </div>
            </div>
          </div>
        </div>

        <Action />
      </div>
    </div>
  );
}
