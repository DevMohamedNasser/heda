import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Adaiya, Doaa } from "@/src/interfaces/doaa.interface";

export default async function AdaiyaPage() {
  const res = await fetch("/api/adaiya");
  const azkarResponse: Adaiya = await res.json();
  const azkar: Doaa[] = azkarResponse.data;

  return (
    <div className="px-2 py-6 pb-16">
      <h1 className="text-3xl font-bold text-center mb-8">أدعية مأثورة</h1>

      <Accordion
        type="single"
        collapsible
        className="w-full md:w-3/4 mx-auto space-y-4"
        defaultValue="item-1"
      >
        {azkar.map((zekr, idx) => (
          <AccordionItem
            key={zekr.id}
            value={`item-${idx + 1}`}
            className="border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-lg font-semibold">
              {zekr.title}
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 px-4 py-3 bg-white">
              <p className="text-gray-800 leading-relaxed">{zekr.text}</p>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-gray-500 text-sm">المصدر: {zekr.source}</p>
                <span
                  className={`inline-block text-xs px-2 py-0.5 rounded-full
                  ${
                    zekr.repeat > 1
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }
                `}
                >
                  {zekr.repeat} {zekr.repeat > 1 ? "مرات" : "مرة"}
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
