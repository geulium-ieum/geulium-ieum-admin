"use client"

import { Button } from "@/components/ui/Button"
import { announcementService } from "@/lib/service/announcement"
import { useParams } from "next/navigation"

export default function Publish({ isPublished }: { isPublished: boolean }) {
  const { id } = useParams()

  const handlePublish = async () => {
    try {
      await announcementService.post.publish({ id: id as string })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="mb-1 text-sm font-semibold text-foreground">발행</h2>
      <p className="mb-4 text-xs text-muted-foreground">
        {isPublished
          ? "이미 발행된 공지입니다."
          : "발행하면 사용자에게 즉시 노출됩니다."}
      </p>
      <Button
        className="w-full"
        disabled={isPublished}
        onClick={handlePublish}
      >
        {isPublished ? "발행 완료" : "지금 발행"}
      </Button>
    </div>
  )
}