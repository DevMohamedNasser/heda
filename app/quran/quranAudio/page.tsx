import ReaderCard from "@/src/components/quran/ReaderCard";
import { readers } from "@/src/components/quran/readers";

export default function ReaderListPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50 pb-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-emerald-800">
        اختر قارئك
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {readers.map((reader) => (
          <ReaderCard
            key={reader.id}
            name={reader.name}
            narrator={reader.style}
            readerId={reader.id}
          />
        ))}
      </div>
    </main>
  );
}
