"use client"

import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/textarea";
import { memorialService } from "@/lib/service/memorial";
import { useParams } from "next/navigation";

export default function Action() {
  // TODO: 승인 여부에 따라 노출
  const { id } = useParams()

  const handleApproveMemorial = async () => {
    try {
      await memorialService.post.approve({ id: id as string })
    } catch (error) {
      console.error(error)
    }
  }

  const handleRejectMemorial = async () => {
    try {
      await memorialService.post.reject({ id: id as string })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-1 text-sm font-semibold text-foreground">승인 처리</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          내용을 확인한 뒤 승인 또는 반려하세요.
        </p>
        <Button
          className="mb-3 w-full"
          onClick={handleApproveMemorial}
        >
          추모관 승인
        </Button>
        <Field>
          <FieldLabel htmlFor="reason">반려 사유</FieldLabel>
          <Textarea
            id="reason"
            name="reason"
            rows={3}
            placeholder="반려 사유를 입력하세요"
            className="resize-none"
          />
          <FieldDescription>반려 시 신청자에게 함께 전달됩니다.</FieldDescription>
        </Field>
        <Button
          variant="destructive"
          className="mt-3 w-full"
          onClick={handleRejectMemorial}
        >
          추모관 반려
        </Button>
      </div>
    </div>
  )
}