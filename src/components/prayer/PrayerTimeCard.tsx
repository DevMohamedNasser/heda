"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sunrise, Sunset } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { getPrayTimes } from "@/app/_actions/prayTimes.api";

function formatTo12Hour(time24: string) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? "م" : "ص";
  hour = hour % 12 || 12; 
  return `${hour}:${minute} ${ampm}`;
}


export default function PrayerTimesCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const fetchPrayerTimes = async (date?: Date) => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const formattedDate = date
          ? date.toLocaleDateString("en-GB").split("/").join("-")
          : new Date().toLocaleDateString("en-GB").split("/").join("-");

        try {
          const result = await getPrayTimes(latitude, longitude, formattedDate);
          setData(result.data);
          setError(null);
          console.log("Prayer times:", result.data);
        } catch (err) {
          console.error(err);
          setError("فشل جلب مواقيت الصلاة");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("تم رفض الوصول للموقع");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchPrayerTimes(); 
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-4xl">جاري تحميل مواقيت الصلاة...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!data) return null;

  const prayers = [
  { name: "الفجر", time: formatTo12Hour(data.timings.Fajr) },
  { name: "الظهر", time: formatTo12Hour(data.timings.Dhuhr) },
  { name: "العصر", time: formatTo12Hour(data.timings.Asr) },
  { name: "المغرب", time: formatTo12Hour(data.timings.Maghrib) },
  { name: "العشاء", time: formatTo12Hour(data.timings.Isha) },
];


  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-sky-900/90 to-emerald-900/90 text-white backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl mt-10 mb-16">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">🕌 مواقيت الصلاة</CardTitle>
        <p className="text-sm text-white/80">
          {data.date.hijri.weekday.ar} — {data.date.readable}
        </p>
        <p className="text-xs text-white/60">
          {data.date.hijri.date} هـ - {data.date.hijri.month.ar}
        </p>

        <div className="flex justify-center">
          <DatePicker
            onSelectDate={(date) => {
              setSelectedDate(date);
              fetchPrayerTimes(date);
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 w-full">
            <Sunrise className="text-yellow-300" />
            <div>
              <p className="text-xs text-white/60">الشروق</p>
              <p className="font-semibold">{data.timings.Sunrise}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 w-full">
            <Sunset className="text-orange-300" />
            <div>
              <p className="text-xs text-white/60">الغروب</p>
              <p className="font-semibold">{data.timings.Sunset}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="flex justify-between items-center bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition"
            >
              <span className="font-medium">{prayer.name}</span>
              <span className="font-mono text-lg">{prayer.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
