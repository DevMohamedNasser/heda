"use client";

import { useEffect, useRef, useState } from "react";

export default function SebhaPage() {
  const [counter, setCounter] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const saved = localStorage.getItem("oldVal");
    return saved ? Number(saved) : 0;
  });

  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (!hasInteractedRef.current) return;
    localStorage.setItem("oldVal", String(counter));
  }, [counter]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-emerald-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-8">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
          السُّبْحَة الرَّقْمِيَّة
        </h1>

        <div className="text-6xl font-extrabold text-emerald-800">
          {counter}
        </div>

        <button
          onClick={() => {
            hasInteractedRef.current = true;
            setCounter((prev) => prev + 1);
          }}
          className="w-44 h-44 rounded-full bg-emerald-600 text-white text-lg font-semibold shadow-2xl active:scale-95 transition"
        >
          اضغط للتسبيح
        </button>

        <button
          onClick={() => {
            hasInteractedRef.current = true;
            setCounter(0);
          }}
          className="px-6 py-2 rounded-full border border-red-500 text-red-600 hover:bg-red-50 transition"
        >
          إعادة تعيين
        </button>
      </div>
    </main>
  );
}
