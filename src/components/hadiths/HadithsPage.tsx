"use client";

import { useEffect, useState } from "react";
import { getHadiths } from "@/app/_actions/hadiths.api";
import { Hadith } from "@/src/interfaces/hadiths.interface";

interface Props {
  slug: string;
  initialHadiths: Hadith[];
  initialNext: string | null;
  initialPrev: string | null;
}

export default function HadithsPage({
  slug,
  initialHadiths,
  initialNext,
  initialPrev,
}: Props) {
  const [hadiths, setHadiths] = useState<Hadith[]>(initialHadiths);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(initialNext);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(initialPrev);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentPage === 1) return;

    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        const response = await getHadiths(`${slug}&page=${currentPage}`);

        if (!isMounted) return;

        setHadiths(response.hadiths.data || []);
        setNextPageUrl(response.hadiths.next_page_url || null);
        setPrevPageUrl(response.hadiths.prev_page_url || null);

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching hadiths:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [currentPage, slug]);

  return (
    <div className="p-4 pb-16">
      <h2 className="text-2xl font-bold mb-6">أحاديث {slug}</h2>

      {loading ? (
        <div className="text-center py-20 text-lg font-medium text-gray-700">
          جاري تحميل الصفحة التالية… ⏳
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {hadiths.map((hadith) => (
            <div key={hadith.id} className="bg-white p-4 rounded-lg shadow">
              {hadith.headingArabic && (
                <h3 className="font-semibold text-lg mb-2">
                  {hadith.hadithNumber}. {hadith.headingArabic}
                </h3>
              )}
              <p className="text-gray-800 leading-relaxed">
                {hadith.hadithArabic}
              </p>
            </div>
          ))}
        </div>
      )}


      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          className="cursor-pointer px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={!prevPageUrl || loading}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          السابق
        </button>

        <span className="px-4 py-2 font-medium">الصفحة {currentPage}</span>

        <button
          className="cursor-pointer px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={!nextPageUrl || loading}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          التالي
        </button>
      </div>
    </div>
  );
}
