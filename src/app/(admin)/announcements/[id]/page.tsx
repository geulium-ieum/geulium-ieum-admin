import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { announcementService } from "@/lib/service/announcement";
import Edit from "./_organisms/Edit";
import Publish from "./_organisms/Publish";
import Delete from "./_organisms/Delete";

export default async function AnnouncementDetailPage(
  props: PageProps<"/announcements/[id]">
) {
  const { id } = await props.params;
  const announcement = await announcementService.get.detail({ id });
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
            <StatusBadge tone={announcement.isPublished ? "success" : "neutral"}>
              {announcement.isPublished
                ? `발행됨 · ${announcement.publishedAt?.slice(0, 10)}`
                : "미발행"}
            </StatusBadge>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Edit props={{
          title: announcement.title,
          content: announcement.content,
          isPinned: announcement.isPinned
        }} />
        <div className="space-y-4">
          <Publish isPublished={announcement.isPublished} />
          <Delete />          
        </div>
      </div>
    </div>
  );
}
