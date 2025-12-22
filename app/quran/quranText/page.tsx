import Link from "next/link";
import { Surah } from "@/src/interfaces/quran.interface";
import { getSuwar } from "@/app/_actions/quran.api";

export default async function QuranText() {

    const suwar: Surah[] = await getSuwar();
    // console.log(suwar);

  return (
    <main className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {suwar?.map((s) => (
        <Link
          key={s.id}
          href={`/quran/quranText/${s.id}`}
          className="border rounded-xl p-4 hover:bg-gray-100 transition cursor-pointer"
        >

          {/* <div className="text-lg font-bold">{s.name}</div> */}
          <h2 className="text-lg font-bold mb-1 group-hover:text-primary transition">
                <span className="text-xs font-mono text-muted-foreground">
                {s.id}. {' '}
              </span>
                 {s.name}
              </h2>

          <span
                className={`inline-block text-xs px-2 py-0.5 rounded-full mb-3
                  ${
                    s.makkia
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700"
                  }
                `}
              >
                {s.makkia ? "مكية" : "مدنية"}
              </span>
          <div className="text-xs mt-1">
            الصفحات: {s.start_page} - {s.end_page}
          </div>
        </Link>
      ))}
    </main>
  )
}
