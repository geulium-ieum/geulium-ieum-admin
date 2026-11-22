"use client"

import { Button } from "@/components/ui/Button";
import { Field, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { announcementService } from "@/lib/service/announcement";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function Edit({ props }: {
  props: {
    title: string
    content: string
    isPinned: boolean
  }
}) {
  const [title, setTitle] = useState<string>(props.title)
  const [content, setContent] = useState<string>(props.content)
  const [isPinned, setIsPinned] = useState<boolean>(props.isPinned)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const { id } = useParams()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await announcementService.put.detail({ id: id as string, title, content, isPinned })
      } catch (error) {
        console.error(error)
        setError("공지 수정에 실패했습니다")
      }
    })
  }

  return (
    <form
      className="space-y-4 rounded-2xl border border-border bg-surface p-6 lg:col-span-2"
      onSubmit={handleSubmit}
    >
      <Field>
        <FieldLabel htmlFor="title">제목</FieldLabel>
        <Input
          id="title"
          name="title"
          type="text"
          value={title}
          maxLength={200}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="content">내용</FieldLabel>
        <Textarea
          id="content"
          name="content"
          rows={10}
          value={content}
          className="resize-none"
          onChange={(e) => setContent(e.target.value)}
        />
      </Field>

      <label htmlFor="isPinned" className="flex items-center gap-2 text-sm text-foreground">
        <input
          id="isPinned"
          name="isPinned"
          type="checkbox"
          checked={isPinned}
          className="size-4 accent-accent"
          onChange={() => setIsPinned(!isPinned)}
        />
        상단 고정
      </label>

      <div className="flex items-center gap-2 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner /> : "변경사항 저장"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}