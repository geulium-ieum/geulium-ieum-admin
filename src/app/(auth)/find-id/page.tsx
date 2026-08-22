import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";

export default function FindIdPage() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6 space-y-1">
        <h1 className="text-lg font-semibold text-foreground">아이디 찾기</h1>
        <p className="text-sm text-muted-foreground">
          가입 시 등록한 이름과 휴대전화번호를 입력하세요.
        </p>
      </div>

      <form className="space-y-4">
        <Field label="이름" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="홍길동"
            className={inputClass}
          />
        </Field>

        <Field label="휴대전화번호" htmlFor="phone" hint="- 없이 숫자만 입력해도 됩니다.">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="010-1234-5678"
            className={inputClass}
          />
        </Field>

        <Button type="submit" variant="primary" className="w-full">
          아이디 찾기
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
