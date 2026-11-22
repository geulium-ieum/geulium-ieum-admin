"use client"

import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Field, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { announcementService } from "@/lib/service/announcement";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function NewAnnouncementPage() {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [isPinned, setIsPinned] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await announcementService.post.create({ title, content, isPinned })
        router.replace("/announcements")
      } catch (error) {
        console.error(error)
        setError("공지 추가에 실패했습니다")
      }
    })
  }

  const handleReset = () => {
    setTitle("")
    setContent("")
    setIsPinned(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/announcements"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          공지사항 목록
        </Link>
        <PageHeader title="새 공지 작성" description="작성 후 발행하기 전까지는 사용자에게 노출되지 않습니다." />
      </div>

      <form
        className="max-w-2xl space-y-4 rounded-2xl border border-border bg-surface p-6"
        onSubmit={handleSubmit}
      >
        <Field>
          <FieldLabel htmlFor="title">제목</FieldLabel>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="예: 추석 연휴 고객센터 운영 안내"
            maxLength={200}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="content">내용</FieldLabel>
          <Textarea
            id="content"
            name="content"
            rows={8}
            placeholder="공지 내용을 입력하세요"
            className="resize-none"
          />
        </Field>

        <label htmlFor="isPinned" className="flex items-center gap-2 text-sm text-foreground">
          <input id="isPinned" name="isPinned" type="checkbox" className="size-4 accent-accent" />
          상단 고정
        </label>

        <div className="flex items-center gap-2 pt-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : "작성 완료"}
          </Button>
          <Button
            type="reset"
            variant="secondary"
            onClick={handleReset}
          >
            초기화
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
