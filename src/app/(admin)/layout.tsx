import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAccessToken } from "@/lib/server/auth";
import { getRoleFromToken } from "@/lib/jwt";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const role = getRoleFromToken(await getAccessToken());
  return <AdminShell role={role}>{children}</AdminShell>;
}
