import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentTabs } from "@/components/admin/ContentTabs";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="콘텐츠 모니터링"
        description="신고 또는 부적절한 추모글·방명록을 검토하고 조치하세요."
      />
      <ContentTabs />
      {children}
    </div>
  );
}
