
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Azkar, Zekr } from "@/src/interfaces/zekr.interface";

// export default async function AzkarPage() {

//   const baseUrl = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : "http://localhost:3000";

//   const res = await fetch(`${baseUrl}/api/azkar`);
//   const azkarResponse: Azkar = await res.json();
//   const azkar: Zekr[] = azkarResponse.data;

//   return (
//     <div className="px-4 py-6 pb-16">
//       <h1 className="text-3xl font-bold text-center mb-8">أذكارنا اليومية</h1>

//       <Accordion
//         type="single"
//         collapsible
//         className="w-full md:w-3/4 mx-auto space-y-4"
//         defaultValue="item-1"
//       >
//         {azkar.map((zekrGroub, idx) => (
//           <AccordionItem
//             key={zekrGroub.id}
//             value={`item-${idx + 1}`}
//             className="border rounded-xl shadow-sm hover:shadow-md transition"
//           >
//             <AccordionTrigger className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-green-50 rounded-xl text-lg font-semibold transition">
//               <span>{zekrGroub.title}</span>
//             </AccordionTrigger>

//             <AccordionContent className="flex flex-col gap-4 px-4 py-4 bg-white">
//               {zekrGroub.groub.map((zekr) => (
//                 <div
//                   key={zekr.id}
//                   className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
//                 >
//                   <p className="text-gray-800 leading-relaxed">{zekr.text}</p>
//                   <div className="flex flex-wrap items-center justify-between mt-2">
//                     <p className="text-gray-500 text-sm">المصدر: {zekr.source}</p>
//                     <span
//                       className={`inline-block text-xs px-2 py-0.5 rounded-full ${
//                         zekr.repeat > 1
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {zekr.repeat} {zekr.repeat > 1 ? "مرات" : "مرة"}
//                     </span>
//                   </div>
//                 </div>
//               ))}
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

// البيانات مباشرة كـ const
export const azkar = [
  {
    id: 1,
    title: "أذكار الصباح",
    groub: [
      {
        id: 1,
        text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير. ربِّ أسألك خير ما في هذا اليوم وخير ما بعده، وأعوذ بك من شر ما في هذا اليوم وشر ما بعده. ربِّ أعوذ بك من الكسل وسوء الكِبر، ربِّ أعوذ بك من عذاب في النار وعذاب في القبر.",
        repeat: 1,
        source: "أذكار الصباح"
      },
      {
        id: 2,
        text: "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك المصير.",
        repeat: 1,
        source: "أذكار الصباح"
      },
      {
        id: 3,
        text: "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك عليّ، وأبوء بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت.",
        repeat: 1,
        source: "أذكار الصباح"
      },
      {
        id: 4,
        text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد صلى الله عليه وسلم نبيًا.",
        repeat: 1,
        source: "أذكار الصباح"
      }
    ]
  },
  {
    id: 2,
    title: "أذكار المساء",
    groub: [
      {
        id: 5,
        text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير. ربِّ أسألك خير ما في هذه الليلة وخير ما بعدها، وأعوذ بك من شر ما في هذه الليلة وشر ما بعدها. ربِّ أعوذ بك من الكسل وسوء الكِبر، ربِّ أعوذ بك من عذاب في النار وعذاب في القبر.",
        repeat: 1,
        source: "أذكار المساء"
      },
      {
        id: 6,
        text: "اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير.",
        repeat: 1,
        source: "أذكار المساء"
      },
      {
        id: 7,
        text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد صلى الله عليه وسلم نبيًا.",
        repeat: 1,
        source: "أذكار المساء"
      }
    ]
  },
  {
    id: 3,
    title: "أذكار بعد الصلاة",
    groub: [
      {
        id: 8,
        text: "أستغفر الله، أستغفر الله، أستغفر الله.",
        repeat: 3,
        source: "أذكار بعد الصلاة"
      },
      {
        id: 9,
        text: "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام.",
        repeat: 1,
        source: "أذكار بعد الصلاة"
      },
      {
        id: 10,
        text: "آية الكرسي: اللَّهُ لا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لا تأخذه سنة ولا نوم له ما في السماوات وما في الأرض ...", // ضع النص الكامل لكل آية
        repeat: 1,
        source: "القرآن الكريم"
      },
      {
        id: 11,
        text: "آخر آيتين من سورة البقرة: آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَبِّهِ ...", // ضع النص الكامل
        repeat: 1,
        source: "القرآن الكريم"
      },
      {
        id: 12,
        text: "المعوذات كاملة: قل هو الله أحد، قل أعوذ برب الفلق، قل أعوذ برب الناس",
        repeat: 1,
        source: "القرآن الكريم"
      }
    ]
  },
  {
    id: 4,
    title: "أذكار النوم",
    groub: [
      {
        id: 13,
        text: "باسمك اللهم أموت وأحيا.",
        repeat: 1,
        source: "أذكار النوم"
      },
      {
        id: 14,
        text: "اللهم قني عذابك يوم تبعث عبادك.",
        repeat: 1,
        source: "أذكار النوم"
      },
      {
        id: 15,
        text: "اللهم باسمك وضعت جنبي وبك أرفعه، فإن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين.",
        repeat: 1,
        source: "أذكار النوم"
      },
      {
        id: 16,
        text: "سبحان الله ثلاثًا وثلاثين، والحمد لله ثلاثًا وثلاثين، والله أكبر أربعًا وثلاثين.",
        repeat: 1,
        source: "أذكار النوم"
      }
    ]
  },
  {
    id: 5,
    title: "أذكار الاستيقاظ",
    groub: [
      {
        id: 17,
        text: "الحمد لله الذي أحيانا بعدما أماتنا وإليه النشور.",
        repeat: 1,
        source: "أذكار الاستيقاظ"
      }
    ]
  },
  {
    id: 6,
    title: "أذكار الطعام",
    groub: [
      {
        id: 18,
        text: "بسم الله، اللهم بارك لنا فيما رزقتنا وقنا عذاب النار.",
        repeat: 1,
        source: "أذكار الطعام"
      }
    ]
  },
  {
    id: 7,
    title: "أذكار المسجد",
    groub: [
      {
        id: 19,
        text: "اللهم افتح لي أبواب رحمتك.",
        repeat: 1,
        source: "أذكار المسجد"
      }
    ]
  },
  {
    id: 8,
    title: "أذكار الدخول والخروج",
    groub: [
      {
        id: 20,
        text: "بسم الله ولجنا وبسم الله خرجنا وعلى ربنا توكلنا.",
        repeat: 1,
        source: "أذكار الدخول والخروج"
      }
    ]
  }
];



export default function AzkarPage() {
  return (
    <div className="px-4 py-6 pb-16">
      <h1 className="text-3xl font-bold text-center mb-8">أذكارنا اليومية</h1>

      <Accordion
        type="single"
        collapsible
        className="w-full md:w-3/4 mx-auto space-y-4"
      >
        {azkar.map((zekrGroup, idx) => (
          <AccordionItem
            key={zekrGroup.id}
            value={`item-${idx + 1}`}
            className="border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-green-50 rounded-xl text-lg font-semibold transition">
              {zekrGroup.title}
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 px-4 py-4 bg-white">
              {zekrGroup.groub.map((zekr) => (
                <div
                  key={zekr.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-800 leading-relaxed">{zekr.text}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">
                      المصدر: {zekr.source}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
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
