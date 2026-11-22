"use client"

import { Button } from "@/components/ui/Button";
import { announcementService } from "@/lib/service/announcement";
import { useParams } from "next/navigation";

export default function Delete() {
  // TODO: 발행, 삭제 시도 시 팝업 노출
  const { id } = useParams()

  const handleDelete = async () => {
    try {
      await announcementService.delete.detail({ id: id as string })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="rounded-2xl border border-rose-200 bg-surface p-5 dark:border-rose-500/20">
      <h2 className="mb-1 text-sm font-semibold text-foreground">위험 구역</h2>
      <p className="mb-4 text-xs text-muted-foreground">삭제한 공지는 복구할 수 없습니다.</p>
      <Button
        variant="destructive"
        className="w-full"
        onClick={handleDelete}
      >
        공지 삭제
      </Button>
    </div>
  )
}