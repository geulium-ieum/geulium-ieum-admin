"use client"

import { Button } from "@/components/ui/Button"
import { Field } from "@/components/ui/Field"
import { Label } from "@/components/ui/label"
import { userService } from "@/lib/service/user"
import { AdminUserDetailResponse, UserRole } from "@/types/api"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function ChangeRole({ user }: { user: AdminUserDetailResponse }) {
  const { id } = useParams()
  
  const [role, setRole] = useState<UserRole>(user.role)

  const handleSaveRole = async () => {
    try {
      await userService.patch.role({ id: id as string, role })
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-sm font-semibold text-foreground">역할 변경</h2>
      <p className="mb-3 text-xs text-muted-foreground">
        SUPER_ADMIN 계정만 역할을 변경할 수 있습니다.
      </p>
      <Field>
        <Label htmlFor="role">역할</Label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="USER">일반회원</option>
          <option value="ADMIN">관리자</option>
          <option value="SUPER_ADMIN">슈퍼 관리자</option>
        </select>
      </Field>
      <Button className="mt-3 w-full">
        역할 저장
      </Button>
    </div>
  )
}