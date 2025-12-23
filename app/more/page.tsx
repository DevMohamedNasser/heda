import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Book, Star, Heart, Zap, User } from "lucide-react";
import ShareSiteCard from "@/src/components/more/ShareSiteCard";

export default function More() {
  const siteUrl = "https://heda-app.vercel.app";

  const features = [
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
      icon: Star,
      color: "bg-green-50 text-green-700",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {features.map((feature) => (
        <Link key={feature.name} href={feature.href} className="block">
          <Card
            className={`p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow cursor-pointer ${feature.color}`}
          >
            <feature.icon className="w-8 h-8 mb-2" />
            <span className="font-semibold text-lg">{feature.name}</span>
          </Card>
        </Link>
      ))}

      <Link
        href="https://devmohamednasser.github.io/portify/"
        target="_blank"
        className="block"
      >
        <Card className="p-6 flex flex-col items-center justify-center text-center bg-blue-50 hover:shadow-xl transition-shadow cursor-pointer">
          <User className="w-8 h-8 mb-2 text-blue-700" />
          <span className="font-semibold text-blue-700">عن المبرمج</span>
        </Card>
      </Link>

      <ShareSiteCard siteUrl={siteUrl} />
    </div>
  );
}
