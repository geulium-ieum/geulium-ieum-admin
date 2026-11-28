"use client"

import { Button } from "@/components/ui/Button"
import { userService } from "@/lib/service/user"
import { AdminUserListItemResponse } from "@/types/api"
import { useRouter } from "next/navigation"

export default function ActiveButton({ user }: { user: AdminUserListItemResponse }) {
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

  return (
    <Button
      size="sm"
      variant="ghost"
      className={user.isActive ? "bg-destructive/10 text-destructive hover:bg-destructive/10 hover:text-destructive" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"}
      onClick={handleToggleActivate}
    >
      {user.isActive ? "비활성화" : "활성화"}
    </Button>
  )
}
