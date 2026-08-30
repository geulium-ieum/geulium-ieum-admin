'use client'

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/Field";
import { toast } from "@/components/ui/toast";
import { userService } from "@/lib/service/user";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { setToken } from "@/lib/server/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;
      try {
        const response = await userService.post.login({
          email,
          password
        });
        await setToken(response);
        router.replace("/dashboard");
      } catch (error) {
        console.error(error);
        toast.add({
          type: "error",
          title: "로그인에 실패했습니다"
        });
      }
    }
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
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
        <FieldGroup>
          <form.Field
            name="email"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>이메일</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="email"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="admin@geulium-ieum.com"
                  autoComplete="email"
                />
              </Field>
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>비밀번호</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="password"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  autoComplete="current-password"
                  placeholder="비밀번호 입력"
                />
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="w-full">
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
