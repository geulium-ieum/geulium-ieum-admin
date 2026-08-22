import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";

export default function PasswordResetRequestPage() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6 space-y-1">
        <h1 className="text-lg font-semibold text-foreground">비밀번호 재설정</h1>
        <p className="text-sm text-muted-foreground">
          가입한 이메일로 인증 코드를 보내드립니다.
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

        <Button type="submit" variant="primary" className="w-full">
          인증 코드 받기
        </Button>
      </form>

      <div className="mt-5 flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <Link href="/password-reset/verify" className="hover:text-foreground">
          이미 코드를 받았어요
        </Link>
        <span className="text-border">·</span>
        <Link href="/login" className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeftIcon className="size-3.5" />
          로그인
        </Link>
      </div>
    </div>
  );
}
