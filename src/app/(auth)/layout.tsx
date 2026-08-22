import type { ReactNode } from "react";
import { FlowerIcon } from "@/components/icons";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-background px-4 py-12">
      <div className="mb-8 flex flex-col items-center gap-2">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <FlowerIcon className="size-6" />
        </span>
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">그리움-이음</p>
          <p className="text-sm text-muted-foreground">관리자 콘솔</p>
        </div>
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
