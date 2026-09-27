"use client"

import { useActionState, useEffect } from "react"
import { purge } from "@/lib/server/auditLog"
import { Button } from "../ui/Button"
import { toast } from "../ui/toast"

export default function PurgeButton() {
  const [state, action, pending] = useActionState(purge, {})

  useEffect(() => {
    if (!state.error) return
    toast.add({
      type: "error",
      title: "오류가 발생했습니다",
      description: state.error,
      timeout: 3000
    })
  }, [state])

  return (
    <Button
      type="submit"
      variant="destructive"
      formAction={action}
      disabled={pending}
    >
      일괄 비우기
    </Button>
  )
}
