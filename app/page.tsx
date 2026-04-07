import Link from "next/link";
import {
  Book,
  Star,
  Heart,
  Zap,
  Headphones,
  Download,
  Users,
  Clock,
  Compass,
  BookOpen,
  Calculator,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      name: "القرآن الكريم",
      href: "/quran",
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      name: "مواقيت الصلاة",
      href: "/prayer-times",
      icon: Clock,
      color: "bg-sky-50 text-sky-700",
    },
    {
      name: "أحاديث",
      href: "/more/narrators",
      icon: Book,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      name: "أذكار",
      href: "/more/azkar",
      icon: Star,
      color: "bg-purple-50 text-purple-700",
    },
    {
      name: "أدعية",
      href: "/more/adaiya",
      icon: Heart,
      color: "bg-pink-50 text-pink-700",
    },
    {
      name: "السبحة الرقمية",
      href: "/more/sebha",
      icon: Zap,
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      name: "حاسبة الزكاة",
      href: "/more/zakah",
      icon: Calculator,
      color: "bg-green-50 text-green-700",
    },
  ];

  return (
    <div className="pb-16 flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans p-6">
      <main className="flex flex-col items-center justify-center max-w-5xl gap-10 text-center">
        
        <Image
          src="/heda-logo.png"
          alt="Landscape picture"
          width={150} height={150}
        />

        <h1 className="text-4xl font-bold text-black dark:text-white">
          تطبيق المسلم
        </h1>

        <div className="flex flex-col items-start gap-2 text-left">
          <Feature
            icon={Book}
            text="قراءة القرآن الكريم"
            color="text-yellow-500"
          />
          <Feature
            icon={Headphones}
            text="الاستماع للقرآن +9 مقرئين"
            color="text-purple-500"
          />
          <Feature
            icon={Download}
            text="تنزيل السور والأجزاء"
            color="text-green-500"
          />
          <Feature
            icon={Clock}
            text="أوقات الصلاة تلقائيًا حسب موقعك"
            color="text-blue-500"
          />
          <Feature
            icon={Compass}
            text="معرفة اتجاه القبلة بدقة"
            color="text-red-500"
          />
          <Feature
            icon={Users}
            text="أذكار، أدعية، السبحة الرقمية وحاسبة الزكاة"
            color="text-pink-500"
          />
        </div>


        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 w-full justify-items-center">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="block w-full"
            >
              <div
                className={`p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow cursor-pointer ${feature.color} rounded-lg`}
              >
                <feature.icon className="w-6 h-6 mb-1" />
                <span className="font-semibold text-base">{feature.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

// مكون Feature صغير للنصوص مع أيقونات
function Feature({
  icon: Icon,
  text,
  color,
}: {
  icon: any;
  text: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-lg text-zinc-700 dark:text-zinc-300">{text}</span>
    </div>
  );
}
