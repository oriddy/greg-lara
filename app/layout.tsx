import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greg Lara — Art Direction + Designer",
  description: "Art Director & Designer. Available for creative partnerships, work-for-hire projects, and long-term roles.",
  openGraph: {
    title: "Greg Lara — Art Direction + Designer",
    description: "Art Director & Designer. Available for creative partnerships.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
