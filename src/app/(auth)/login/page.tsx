'use client'

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";

export default function LoginPage() {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6 space-y-1">
        <h1 className="text-lg font-semibold text-foreground">로그인</h1>
        <p className="text-sm text-muted-foreground">
          관리자 계정으로 로그인하세요.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
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

        <Field label="비밀번호" htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호 입력"
            className={inputClass}
          />
        </Field>

        <Button type="submit" variant="primary" className="w-full">
          로그인
        </Button>
      </form>

      <div className="mt-5 flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <Link href="/find-id" className="hover:text-foreground">
          아이디 찾기
        </Link>
        <span className="text-border">·</span>
        <Link href="/password-reset" className="hover:text-foreground">
          비밀번호 재설정
        </Link>
      </div>
    </div>
  );
}
