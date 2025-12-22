import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal as TajawalFont } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "هدى - تطبيق المسلم",
  description: "تطبيق شامل للأذكار، الأدعية، السبحة الرقمية، حاسبة الزكاة والقرآن الكريم مع أوقات الصلاة والقبلة",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Navbar />
      </body>
    </html>
  );
}
