import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ReaderCardProps {
  name: string;
  narrator: string;
  readerId: number;
}

export default function ReaderCard({ name, narrator, readerId }: ReaderCardProps) {
  return (
    <Card className="flex flex-col justify-between w-72 h-56 bg-linear-to-br from-emerald-600 to-emerald-500 text-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      
      <CardHeader className="px-6 pt-6">
        <h2 className="text-xl font-bold">{name}</h2>
      </CardHeader>

      <CardContent className="px-6 mt-1 flex-1 flex items-center">
        <Badge className="bg-white/20 text-white text-sm py-1 px-3 rounded-full font-medium">
          {narrator}
        </Badge>
      </CardContent>

      <CardFooter className="px-6 pb-0 mt-0">
        <Link href={`/quran/quranAudio/${readerId}`}>
          <Button className="cursor-pointer w-full bg-white text-emerald-700 hover:bg-white/90 hover:text-emerald-900 font-medium rounded-xl shadow-md transition-all duration-200">
            استماع
          </Button>
        </Link>
      </CardFooter>

    </Card>
  );
}
