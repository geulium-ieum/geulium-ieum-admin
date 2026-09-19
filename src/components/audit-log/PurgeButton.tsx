"use client"

import { auditService } from "@/lib/service/auditLog"
import { Button } from "../ui/Button"
import { toast } from "../ui/toast"
import { HTTPError } from "ky"

export default function PurgeButton({
  token
}: {
  token: string | undefined
}) {
  const handlePurge = async () => {
    try {
      await auditService.delete.DLQPurge({
          token: token ? token : "",
          max: 100
        })
    } catch (error) {
      if (error instanceof HTTPError) {
        console.error(error);
        toast.add({
          type: "error",
          title: "오류가 발생했습니다",
          description: error.data.message,
          timeout: 3000
        });
      }
    }
  }
  return (
    <Button
      variant="destructive"
      onClick={handlePurge}
    >
      전체 비우기
    </Button>
  )
}
