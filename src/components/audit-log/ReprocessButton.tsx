"use client"

import { useActionState, useEffect } from "react"
import { reprocess } from "@/lib/server/auditLog"
import { Button } from "../ui/Button"
import { toast } from "../ui/toast"

export default function ReprocessButton() {
  const [state, action, pending] = useActionState(reprocess, {})

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
      variant="secondary"
      formAction={action}
      disabled={pending}
    >
      재처리
    </Button>
  )
}
