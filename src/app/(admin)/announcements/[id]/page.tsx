import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { mockAnnouncements } from "@/lib/mock/announcements";

export default async function AnnouncementDetailPage(
  props: PageProps<"/announcements/[id]">
) {
  const { id } = await props.params;
  const announcement = mockAnnouncements.find((a) => a.id === Number(id));
  if (!announcement) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/announcements"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          공지사항 목록
        </Link>
        <PageHeader
          title={announcement.title}
          description={`작성 ${announcement.createdAt.slice(0, 10)} · 수정 ${announcement.updatedAt.slice(0, 10)}`}
          actions={
            <Badge tone={announcement.isPublished ? "success" : "neutral"}>
              {announcement.isPublished
                ? `발행됨 · ${announcement.publishedAt?.slice(0, 10)}`
                : "미발행"}
            </Badge>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <form className="space-y-4 rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
          <Field label="제목" htmlFor="title">
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={announcement.title}
              maxLength={200}
              className={inputClass}
            />
          </Field>

          <Field label="내용" htmlFor="content">
            <textarea
              id="content"
              name="content"
              rows={10}
              defaultValue={announcement.content}
              className={`${inputClass} resize-none`}
            />
          </Field>

          <label htmlFor="isPinned" className="flex items-center gap-2 text-sm text-foreground">
            <input
              id="isPinned"
              name="isPinned"
              type="checkbox"
              defaultChecked={announcement.isPinned}
              className="size-4 accent-accent"
            />
            상단 고정
          </label>

          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" variant="primary">
              변경사항 저장
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-1 text-sm font-semibold text-foreground">발행</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              {announcement.isPublished
                ? "이미 발행된 공지입니다."
                : "발행하면 사용자에게 즉시 노출됩니다."}
            </p>
            <Button variant="primary" className="w-full" disabled={announcement.isPublished}>
              {announcement.isPublished ? "발행 완료" : "지금 발행"}
            </Button>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-surface p-5 dark:border-rose-500/20">
            <h2 className="mb-1 text-sm font-semibold text-foreground">위험 구역</h2>
            <p className="mb-4 text-xs text-muted-foreground">삭제한 공지는 복구할 수 없습니다.</p>
            <Button variant="danger" className="w-full">
              공지 삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
