import { getSurah } from "@/app/_actions/quran.api";
import { Progressbar } from "@/src/components/prayer/Progressbar";
import { DataAboutSurah } from "@/src/interfaces/realSurah.interface";


export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  const surah: DataAboutSurah = await getSurah(id);

  function divideWords(text: string) {
    const words = text.split(" ");
    const firstWords = words.slice(0, 4).join(" ");
    const rest = words.slice(4).join(" ");
    return (
      <>
        <p className="text-center mb-4">{firstWords}</p>
        <span>{rest}</span>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-6 pb-16 text-right">
      <Progressbar />
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-blue-900 border-4 border-blue-500 rounded-xl shadow-lg py-4 mb-6 bg-linear-to-r from-blue-200 to-blue-100">
        {surah.name}
      </h1>

      <div className="text-3xl md:text-4xl leading-relaxed font-scheherazade text-center">
        {surah.ayahs.map((ayah) => (
          <span key={ayah.numberInSurah} className="">
            {ayah.numberInSurah == 1 ? (
              divideWords(ayah.text)
            ) : (
              <span>{ayah.text}</span>
            )}
            <span className="inline-flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-full text-center text-blue-900 font-bold text-xl mr-1">
              {ayah.numberInSurah}
            </span>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
