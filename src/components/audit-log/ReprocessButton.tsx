"use client"

import { HTTPError } from "ky";
import { Button } from "../ui/Button"
import { toast } from "../ui/toast";
import { auditService } from "@/lib/service/auditLog";

export default function ReprocessButton({
  token
}: {
  token: string | undefined
}) {
  const handleReprocess = async () => {
    try {
      await auditService.post.DLQReprocess({
        token: token ? token : "",
        max: 100
      });
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
  };

  return (
    <Button
      variant="secondary"
      onClick={handleReprocess}
    >
      재처리
    </Button>
  )
}