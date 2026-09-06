"use client";

import Link from "next/link";
import { redirect, RedirectType, usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { FlowerIcon, MenuIcon, XIcon } from "@/components/icons";
import { adminNav } from "@/lib/admin-nav";
import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { deleteToken } from "@/lib/server/auth";

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 px-1">
      <span className="flex size-8 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <FlowerIcon className="size-4.5" />
      </span>
      <span className="text-sm font-semibold text-foreground">그리움-이음 관리자</span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-0.5 px-3">
      {adminNav.map((item) => {
        const active = pathname.startsWith(item.match);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-accent-soft"
                : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
            }`}
          >
            <Icon className="size-4.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AccountFooter() {
  const handleLogout = async () => {
    try {
      await deleteToken();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-2.5 border-t border-border px-4 py-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-semibold text-foreground">
        관리
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">관리자</p>
        {/* <RoleBadge role="ADMIN" /> */}
      </div>
      <Button
        variant="ghost"
        aria-label="로그아웃"
        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground hover:cursor-pointer"
        onClick={handleLogout}
      >
        <LogOutIcon className="size-4.5" />
      </Button>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const current = adminNav.find((item) => pathname.startsWith(item.match));

  return (
    <div className="flex min-h-screen">
      {/* 데스크톱 사이드바 */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface py-4 md:flex">
        <div className="mb-4">
          <Logo />
        </div>
        <NavList />
        <AccountFooter />
      </aside>

      {/* 모바일 드로어 */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="메뉴 닫기"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-border bg-surface py-4">
            <div className="mb-4 flex items-center justify-between px-1">
              <Logo />
              <button
                aria-label="메뉴 닫기"
                onClick={() => setMobileOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-muted"
              >
                <XIcon className="size-4.5" />
              </button>
            </div>
            <NavList onNavigate={() => setMobileOpen(false)} />
            <AccountFooter />
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface px-4 md:px-6">
          <button
            aria-label="메뉴 열기"
            onClick={() => setMobileOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-muted md:hidden"
          >
            <MenuIcon className="size-5" />
          </button>
          <p className="text-sm font-medium text-foreground">{current?.label ?? ""}</p>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
