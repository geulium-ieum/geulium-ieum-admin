import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockAuditLogs, mockDlqSize } from "@/lib/mock/audit-logs";
import { toSlice } from "@/lib/mock/slice";
import type { AuditAction } from "@/types/api";

const actionTone: Record<AuditAction, "neutral" | "accent" | "success" | "warning" | "danger" | "info"> = {
  CREATE: "success",
  UPDATE: "info",
  DELETE: "danger",
  LOGIN: "neutral",
  LOGOUT: "neutral",
};

export default async function AuditLogsPage(props: PageProps<"/audit-logs">) {
  const sp = await props.searchParams;
  const action = typeof sp.action === "string" ? sp.action : "";
  const targetType = typeof sp.targetType === "string" ? sp.targetType : "";
  const userId = typeof sp.userId === "string" ? sp.userId : "";
  const page = Number(sp.page ?? 0) || 0;

  const filtered = mockAuditLogs.filter((log) => {
    if (action && log.action !== action) return false;
    if (targetType && !log.targetType.toLowerCase().includes(targetType.toLowerCase())) return false;
    if (userId && String(log.userId) !== userId) return false;
    return true;
  });
  const slice = toSlice(filtered, { page, size: 10 });
  const extraParams = {
    ...(action ? { action } : {}),
    ...(targetType ? { targetType } : {}),
    ...(userId ? { userId } : {}),
  };

  return (
    <div className="space-y-6">
      <PageHeader title="감사 로그" description="관리자 및 시스템 활동 이력을 조회하세요." />

      <form className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-2 lg:grid-cols-5">
        <Field label="액션" htmlFor="action">
          <select id="action" name="action" defaultValue={action} className={inputClass}>
            <option value="">전체</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="LOGIN">LOGIN</option>
            <option value="LOGOUT">LOGOUT</option>
          </select>
        </Field>
        <Field label="대상 타입" htmlFor="targetType">
          <input
            id="targetType"
            name="targetType"
            defaultValue={targetType}
            placeholder="예: MEMORIAL"
            className={inputClass}
          />
        </Field>
        <Field label="사용자 ID" htmlFor="userId">
          <input
            id="userId"
            name="userId"
            defaultValue={userId}
            placeholder="예: 1038"
            className={inputClass}
          />
        </Field>
        <Field label="시작일" htmlFor="from">
          <input id="from" name="from" type="date" className={inputClass} />
        </Field>
        <Field label="종료일" htmlFor="to">
          <input id="to" name="to" type="date" className={inputClass} />
        </Field>
        <div className="flex items-end sm:col-span-2 lg:col-span-5">
          <Button type="submit" variant="primary">
            조회
          </Button>
        </div>
      </form>

      <div className="rounded-2xl border border-border bg-surface">
        {slice.content.length === 0 ? (
          <EmptyState title="조건에 맞는 로그가 없습니다" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">시각</th>
                  <th className="px-5 py-3 font-medium">액션</th>
                  <th className="px-5 py-3 font-medium">대상</th>
                  <th className="px-5 py-3 font-medium">사용자</th>
                  <th className="px-5 py-3 font-medium">IP</th>
                  <th className="px-5 py-3 font-medium">User Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {slice.content.map((log) => (
                  <tr key={log.id}>
                    <td className="px-5 py-3 whitespace-nowrap text-muted-foreground">
                      {log.createdAt.slice(0, 19).replace("T", " ")}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={actionTone[log.action]}>{log.action}</Badge>
                    </td>
                    <td className="px-5 py-3 text-foreground">
                      {log.targetType} #{log.targetId}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">#{log.userId}</td>
                    <td className="px-5 py-3 text-muted-foreground">{log.ipAddress}</td>
                    <td className="max-w-[220px] truncate px-5 py-3 text-muted-foreground">
                      {log.userAgent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination
          page={slice.number}
          first={slice.first}
          last={slice.last}
          numberOfElements={slice.numberOfElements}
          size={slice.size}
          basePath="/audit-logs"
          extraParams={extraParams}
        />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Dead Letter Queue</h2>
            <p className="text-xs text-muted-foreground">
              처리에 실패해 유실 위험이 있는 감사 로그 이벤트를 관리합니다.
            </p>
          </div>
          <p className="text-2xl font-semibold tabular-nums text-foreground">{mockDlqSize}</p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Field label="최대 처리 건수" htmlFor="max">
            <input
              id="max"
              name="max"
              type="number"
              defaultValue={100}
              className={`${inputClass} w-32`}
            />
          </Field>
          <Button variant="secondary">재처리</Button>
          <Button variant="danger">전체 비우기</Button>
        </div>
      </div>
    </div>
  );
}
