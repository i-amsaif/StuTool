import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download StuTool for Android — Free PDF Tools & Resume Builder",
  description:
    "Download StuTool APK for Android. Powerful PDF tools, fast PDF viewer, document scanner, and resume builder. Free and lightweight.",
};

export default function AndroidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
