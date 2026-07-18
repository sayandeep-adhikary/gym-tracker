import type { Metadata } from "next";

import { ProgressDashboard } from "@/components/progress/progress-dashboard";

export const metadata: Metadata = {
  title: "Progress",
};

export default function ProgressPage() {
  return <ProgressDashboard />;
}
