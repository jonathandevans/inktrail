import { type ReactNode } from "react";

export default function BlogLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { name: string };
}) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      {children}
    </main>
  );
}
