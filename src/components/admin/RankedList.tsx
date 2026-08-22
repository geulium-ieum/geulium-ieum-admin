export function RankedList({
  items,
  unit,
}: {
  items: { id: number; label: string; sublabel?: string; count: number }[];
  unit: string;
}) {
  const max = Math.max(1, ...items.map((i) => i.count));

  if (items.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">데이터가 없습니다.</p>;
  }

  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item.id} className="flex items-center gap-3">
          <span className="w-4 shrink-0 text-xs font-semibold text-muted-foreground">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-sm font-medium text-foreground">{item.label}</p>
              <p className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {item.count.toLocaleString("ko-KR")}
                {unit}
              </p>
            </div>
            {item.sublabel ? (
              <p className="truncate text-xs text-muted-foreground">{item.sublabel}</p>
            ) : null}
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${Math.max(6, (item.count / max) * 100)}%` }}
              />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
