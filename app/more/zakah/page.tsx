"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ZakatCalculator() {
  const [money, setMoney] = useState<number | "">("");
  const [zakat, setZakat] = useState<number | null>(null);

  const calculateZakat = () => {
    if (typeof money === "number" && money > 0) {
      const zakatAmount = money * 0.025;
      setZakat(zakatAmount);
    } else {
      setZakat(null);
    }
  };

  return (
    <div className="px-2">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mb-16">
        <h1 className="text-2xl font-bold text-center">حاسبة الزكاة</h1>

        <div className="space-y-2 text-gray-700">
          <p>💰 الزكاة واجبة على المال، الذهب، الفضة، والتجارة.</p>
          <p>❌ لا تخرج الزكاة عن السيارة، الهاتف، أو البيت.</p>
          <p>📏 نسبة الزكاة: 2.5% من المال عند بلوغ النصاب وحولان الحول.</p>
        </div>

        <div className="flex flex-col space-y-4">
          <Input
            type="number"
            placeholder="أدخل قيمة المال بالعملة المحلية"
            value={money}
            onChange={(e) => setMoney(Number(e.target.value))}
          />
          <Button onClick={calculateZakat} className="cursor-pointer">
            احسب الزكاة
          </Button>
        </div>

        {zakat !== null && (
          <div className="text-lg font-semibold text-green-700">
            مقدار الزكاة: {zakat.toFixed(2)}
          </div>
        )}

        <div className="space-x-4 mt-4">
          <Button
            variant="link"
            className="underline cursor-pointer text-blue-500"
            onClick={() =>
              window.open("https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.dar-alifta.org/ar/fatwa/details/11653/%25D9%2585%25D9%2582%25D8%25AF%25D8%25A7%25D8%25B1-%25D9%2586%25D8%25B5%25D8%25A7%25D8%25A8-%25D8%25B2%25D9%2583%25D8%25A7%25D8%25A9-%25D8%25A7%25D9%2584%25D9%2585%25D8%25A7%25D9%2584&ved=2ahUKEwiYwKn39dGRAxXG_7sIHQ5WOMwQFnoECBgQAQ&usg=AOvVaw1BMpRPst9G1G24ENkKfnnC", "_blank")
            }
          >
            مصدر دار الإفتاء
          </Button>
        </div>
      </div>
    </div>
  );
}
