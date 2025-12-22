import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">

        <Link href="/quran/quranText" className="group">
          <div className="
            relative overflow-hidden rounded-2xl p-8
            bg-linear-to-br from-emerald-600 to-emerald-800
            text-white shadow-xl
            transition-all duration-300
            group-hover:scale-[1.04]
            group-hover:shadow-2xl
          ">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

            <h2 className="text-3xl font-bold mb-3">📖 القرآن قراءة</h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              تصفح سور القرآن الكريم بخط واضح وتجربة قراءة مريحة للعين
            </p>

            <span className="inline-block mt-6 font-medium underline underline-offset-4">
              ابدأ القراءة →
            </span>
          </div>
        </Link>

        {/* القرآن استماع وتنزيل */}
        <Link href="/quran/quranAudio" className="group">
          <div className="
            relative overflow-hidden rounded-2xl p-8
            bg-linear-to-br from-amber-500 to-yellow-600
            text-white shadow-xl
            transition-all duration-300
            group-hover:scale-[1.04]
            group-hover:shadow-2xl
          ">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

            <h2 className="text-3xl font-bold mb-3">🎧 القرآن استماع وتنزيل</h2>
            <p className="text-sm text-amber-100 leading-relaxed">
              استمع للقرآن الكريم بأصوات نخبة من القرّاء  <span className="font-bold text-gray-100"> مع إمكانية التحميل</span> 
            </p>

            <span className="inline-block mt-6 font-medium underline underline-offset-4">
              ابدأ الاستماع →
            </span>
          </div>
        </Link>

      </div>
    </main>
  );
}
