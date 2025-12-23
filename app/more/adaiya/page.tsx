// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Adaiya, Doaa } from "@/src/interfaces/doaa.interface";

// export default async function AdaiyaPage() {

//   const baseUrl = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : "http://localhost:3000";

//   const res = await fetch(`${baseUrl}/api/adaiya`);
//   const azkarResponse: Adaiya = await res.json();
//   const azkar: Doaa[] = azkarResponse.data;

//   return (
//     <div className="px-2 py-6 pb-16">
//       <h1 className="text-3xl font-bold text-center mb-8">أدعية مأثورة</h1>

//       <Accordion
//         type="single"
//         collapsible
//         className="w-full md:w-3/4 mx-auto space-y-4"
//         defaultValue="item-1"
//       >
//         {azkar.map((zekr, idx) => (
//           <AccordionItem
//             key={zekr.id}
//             value={`item-${idx + 1}`}
//             className="border rounded-lg shadow-sm hover:shadow-md transition"
//           >
//             <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-lg font-semibold">
//               {zekr.title}
//             </AccordionTrigger>

//             <AccordionContent className="flex flex-col gap-4 px-4 py-3 bg-white">
//               <p className="text-gray-800 leading-relaxed">{zekr.text}</p>
//               <div className="flex flex-wrap items-center justify-between">
//                 <p className="text-gray-500 text-sm">المصدر: {zekr.source}</p>
//                 <span
//                   className={`inline-block text-xs px-2 py-0.5 rounded-full
//                   ${
//                     zekr.repeat > 1
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-green-100 text-green-700"
//                   }
//                 `}
//                 >
//                   {zekr.repeat} {zekr.repeat > 1 ? "مرات" : "مرة"}
//                 </span>
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   );
// }





import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const dynamic = "force-dynamic"; // مهم لتجنب prerender errors

const ad3iya = [
  {
    id: 1,
    title: "دعاء الاستخارة",
    text: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلا أَقْدِرُ وَتَعْلَمُ وَلا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِي الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ",
    repeat: 1,
    source: "سنة الاستخارة",
  },
  {
    id: 2,
    title: "دعاء الكرب",
    text: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    repeat: 3,
    source: "أذكار مأثورة",
  },
  {
    id: 3,
    title: "دعاء القلق والحزن",
    text: "اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ أَوِ اسْتَأثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلَاءَ حُزْنِي وَذَهَابَ هَمِّي",
    repeat: 1,
    source: "دعاء منشور عن السلف",
  },
  {
    id: 4,
    title: "دعاء السفر",
    text: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبَرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ",
    repeat: 1,
    source: "أدعية مأثورة للسفر",
  },
  {
    id: 5,
    title: "دعاء لبس الثوب",
    text: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    repeat: 1,
    source: "أذكار مأثورة",
  },
  {
    id: 6,
    title: "دعاء دخول الخلاء",
    text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ",
    repeat: 1,
    source: "أذكار مأثورة",
  },
  {
    id: 7,
    title: "دعاء الخروج من الخلاء",
    text: "غفرانك",
    repeat: 1,
    source: "أذكار مأثورة",
  },
  {
    id: 8,
    title: "دعاء الطعام",
    text: "بِسْمِ اللَّهِ، اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    repeat: 1,
    source: "أذكار مأثورة",
  },
  {
    id: 9,
    title: "دعاء المسجد",
    text: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    repeat: 1,
    source: "أذكار مأثورة",
  },
  {
    id: 10,
    title: "دعاء بعد الصلاة",
    text: "أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، اللَّهُمَّ اجعل صلاتي نوراً وطمأنينة",
    repeat: 1,
    source: "أذكار مأثورة بعد الصلاة",
  },
];

export default function AdaiyaPage() {
  return (
    <div className="px-2 py-6 pb-16">
      <h1 className="text-3xl font-bold text-center mb-8">الأدعية الكاملة</h1>

      <Accordion
        type="single"
        collapsible
        className="w-full md:w-3/4 mx-auto space-y-4"
      >
        {ad3iya.map((zekr, idx) => (
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
