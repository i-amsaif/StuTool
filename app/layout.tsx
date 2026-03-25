import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "StuTool — Student Productivity Toolkit",
  description:
    "Free student productivity tools — PDF editor, resume builder, and more. Built for students, by students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="relative z-10 pb-20 md:pb-0">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
