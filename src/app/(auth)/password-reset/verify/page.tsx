import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/input";

export default function PasswordResetVerifyPage() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6 space-y-1">
        <h1 className="text-lg font-semibold text-foreground">
          비밀번호 재설정 인증
        </h1>
        <p className="text-sm text-muted-foreground">
          이메일로 받은 인증 코드와 새 비밀번호를 입력하세요.
        </p>
      </div>

      <form className="space-y-4">
        <Field>
          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="admin@geulium-ieum.com"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="code">인증 코드</FieldLabel>
          <Input
            id="code"
            name="code"
            type="text"
            placeholder="이메일로 받은 코드를 입력하세요"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="newPassword">새 비밀번호</FieldLabel>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            placeholder="새 비밀번호 입력"
          />
          <FieldDescription>영문·숫자·특수문자를 포함해 8~20자로 입력하세요.</FieldDescription>
        </Field>

        <Button type="submit" className="w-full">
          비밀번호 변경
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-5 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        로그인으로 돌아가기
      </Link>
    </div>
  );
}
