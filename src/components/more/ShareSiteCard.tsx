'use client';

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Copy } from "lucide-react";

export default function ShareSiteCard({ siteUrl }: { siteUrl: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-4 text-center hover:shadow-lg transition-shadow bg-green-50 flex flex-col items-center justify-center cursor-pointer" onClick={copyLink}>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className="font-semibold text-green-700">رابط الموقع</span>
        <Copy className="w-5 h-5 text-green-700" />
      </div>
      <p className="text-sm text-gray-700 mt-2 break-all">{siteUrl}</p>
      {copied && <p className="text-xs text-gray-500 mt-1">تم نسخ الرابط!</p>}
    </Card>
  );
}
