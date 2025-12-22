"use client";

import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { useState } from "react";
import AudioPlayer from "./AudioPlayer";

export default function PlayerBtn({ serverSrc }: { serverSrc: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <Button
        onClick={() => setOpen(!open)}
        variant={open ? "destructive" : "outline"}
        size="sm"
        className="w-full flex items-center gap-2"
      >
        {open ? <X size={16} /> : <Play size={16} />}
        {open ? "إخفاء المشغل" : "تشغيل السورة"}
      </Button>

      {open && (
        <div className="mt-3">
          <AudioPlayer audioSrc={serverSrc} />
        </div>
      )}
    </div>
  );
}
