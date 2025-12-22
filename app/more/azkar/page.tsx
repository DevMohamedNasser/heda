
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Azkar, Zekr } from "@/src/interfaces/zekr.interface";

export default async function AzkarPage() {
  const res = await fetch("/api/azkar");
  const azkarResponse: Azkar = await res.json();
  const azkar: Zekr[] = azkarResponse.data;

  return (
    <div className="px-4 py-6 pb-16">
      <h1 className="text-3xl font-bold text-center mb-8">أذكارنا اليومية</h1>

      <Accordion
        type="single"
        collapsible
        className="w-full md:w-3/4 mx-auto space-y-4"
        defaultValue="item-1"
      >
        {azkar.map((zekrGroub, idx) => (
          <AccordionItem
            key={zekrGroub.id}
            value={`item-${idx + 1}`}
            className="border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <AccordionTrigger className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-green-50 rounded-xl text-lg font-semibold transition">
              <span>{zekrGroub.title}</span>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 px-4 py-4 bg-white">
              {zekrGroub.groub.map((zekr) => (
                <div
                  key={zekr.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-800 leading-relaxed">{zekr.text}</p>
                  <div className="flex flex-wrap items-center justify-between mt-2">
                    <p className="text-gray-500 text-sm">المصدر: {zekr.source}</p>
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                        zekr.repeat > 1
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {zekr.repeat} {zekr.repeat > 1 ? "مرات" : "مرة"}
                    </span>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
