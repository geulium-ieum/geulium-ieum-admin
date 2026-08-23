import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, FlameIcon, MessageIcon, UsersIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { MemorialStatusBadge, VisibilityBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { mockMemorialStats, mockMemorials } from "@/lib/mock/memorials";

export default async function MemorialDetailPage(props: PageProps<"/memorials/[id]">) {
  const { id } = await props.params;
  const memorial = mockMemorials.find((m) => m.id === Number(id));
  const stats = mockMemorialStats[Number(id)];
  if (!memorial || !stats) notFound();

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
              <MemorialStatusBadge status={memorial.status} />
              <VisibilityBadge visibility={memorial.visibility} />
            </div>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-4 sm:justify-start">
                <dt className="text-muted-foreground">장소</dt>
                <dd className="text-foreground">{memorial.location || "미등록"}</dd>
              </div>
              <div className="flex justify-between gap-4 sm:justify-start">
                <dt className="text-muted-foreground">등록일</dt>
                <dd className="text-foreground">{memorial.createdAt.slice(0, 10)}</dd>
              </div>
              <div className="flex justify-between gap-4 sm:justify-start">
                <dt className="text-muted-foreground">등록자 ID</dt>
                <dd className="text-foreground">#{memorial.createdBy}</dd>
              </div>
              <div className="flex justify-between gap-4 sm:justify-start">
                <dt className="text-muted-foreground">최종 수정</dt>
                <dd className="text-foreground">{memorial.updatedAt.slice(0, 10)}</dd>
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
                <p className="text-base font-semibold text-foreground">{stats.tributeCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
                <FlameIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">헌화·분향</p>
                <p className="text-base font-semibold text-foreground">{stats.offeringCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft">
                <UsersIcon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">가족 구성원</p>
                <p className="text-base font-semibold text-foreground">{stats.memberCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-1 text-sm font-semibold text-foreground">승인 처리</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              내용을 확인한 뒤 승인 또는 반려하세요.
            </p>
            <Button variant="primary" className="mb-3 w-full">
              추모관 승인
            </Button>
            <Field label="반려 사유" htmlFor="reason" hint="반려 시 신청자에게 함께 전달됩니다.">
              <textarea
                id="reason"
                name="reason"
                rows={3}
                placeholder="반려 사유를 입력하세요"
                className={`${inputClass} resize-none`}
              />
            </Field>
            <Button variant="danger" className="mt-3 w-full">
              추모관 반려
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
