import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";

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
        <Field label="이메일" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="admin@geulium-ieum.com"
            className={inputClass}
          />
        </Field>

        <Field label="인증 코드" htmlFor="code">
          <input
            id="code"
            name="code"
            type="text"
            placeholder="이메일로 받은 코드를 입력하세요"
            className={inputClass}
          />
        </Field>

        <Field
          label="새 비밀번호"
          htmlFor="newPassword"
          hint="영문·숫자·특수문자를 포함해 8~20자로 입력하세요."
        >
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            placeholder="새 비밀번호 입력"
            className={inputClass}
          />
        </Field>

        <Button type="submit" variant="primary" className="w-full">
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
