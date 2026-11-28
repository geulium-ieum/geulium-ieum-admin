"use client"

import { Button } from "@/components/ui/Button";
import { userService } from "@/lib/service/user";
import { AdminUserDetailResponse } from "@/types/api";
import { useRouter } from "next/navigation";

export default function ManageAccount({ user }: { user: AdminUserDetailResponse }) {
  const router = useRouter()

  const handleToggleActivate = async () => {
    try {
      if (user.isActive) {
        await userService.patch.deactivate({ id: user.id })
      } else {
        await userService.patch.activate({ id: user.id })
      }
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    // TODO: 삭제 팝업 추가 필요, user Id 입력 받아서 일치할 때만 삭제되도록
    try {
      await userService.delete.user({ id: user.id })
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="rounded-2xl border border-rose-200 bg-surface p-5 dark:border-rose-500/20">
      <h2 className="mb-1 text-sm font-semibold text-foreground">위험 구역</h2>
      <p className="mb-4 text-xs text-muted-foreground">
        계정 상태 변경 및 삭제는 신중하게 진행하세요.
      </p>
      <div className="flex flex-col gap-2">
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleToggleActivate}
        >
          {user.isActive ? "계정 비활성화" : "계정 활성화"}
        </Button>
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleDelete}
        >
          계정 삭제
        </Button>
      </div>
    </div>
  )
}