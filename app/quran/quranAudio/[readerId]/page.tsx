import { getSuwar } from "@/app/_actions/quran.api";
import PlayerBtn from "@/src/components/quran/PlayerBtn";
import { readers } from "@/src/components/quran/readers";
import { Surah } from "@/src/interfaces/quran.interface";

export default async function Page({
  params,
}: {
  params: Promise<{ readerId: string }>;
}) {
  const { readerId } = await params;
  // console.log(readerId);
  const reader = readers.find((r) => Number(readerId) === r.id);

  const suwar: Surah[] = await getSuwar();

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">🎧 القارئ</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          الشيخ{" "}
          <span className="font-semibold text-foreground">{reader?.name}</span>
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
        {suwar.map((s, idx) => {
          const formattedIndex = String(idx + 1).padStart(3, "0");

          return (
            <div
              key={s.id}
              className="
                group relative rounded-2xl border bg-card p-5
                shadow-sm transition-all
                hover:-translate-y-1 hover:shadow-lg
              "
            >
              <h2 className="text-lg font-bold mb-1 group-hover:text-primary transition">
                <span className="text-xs font-mono text-muted-foreground">
                  {idx + 1}.{" "}
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

              <PlayerBtn serverSrc={`${reader?.server}${formattedIndex}.mp3`} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
