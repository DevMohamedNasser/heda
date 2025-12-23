// "use client";

// import { useEffect, useState } from "react";
// import { getPrayTimes } from "../_actions/prayTimes.api";
// import { PrayTimesInterface, Data } from "@/src/interfaces/prayTimes.interface";
// import PrayerTimesCard from "@/src/components/prayer/PrayerTimeCard";

// export default function PrayerPage() {
//   const [data, setData] = useState<Data | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchPrayerTimes = async (date?: Date) => {
//     setLoading(true);
//     if (!navigator.geolocation) {
//       setError("الموقع الجغرافي غير مدعوم");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const formattedDate = date
//           ? date.toLocaleDateString("en-GB").split("/").join("-")
//           : new Date().toLocaleDateString("en-GB").split("/").join("-");

//         try {
//           const result: PrayTimesInterface = await getPrayTimes(latitude, longitude, formattedDate);
//           setData(result.data);
//           setError(null);
//         } catch (err) {
//           console.error(err);
//           setError("فشل جلب مواقيت الصلاة");
//         } finally {
//           setLoading(false);
//         }
//       },
//       (err) => {
//         console.error(err);
//         setError("تم رفض الوصول للموقع");
//         setLoading(false);
//       }
//     );
//   };

//   useEffect(() => {
//     fetchPrayerTimes();
//   }, []);

//   if (loading) return <div className="text-center mt-10 text-4xl">جاري تحميل مواقيت الصلاة...</div>;
//   if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
//   if (!data) return null;

//   return (
//     <div className="px-4">
//       <PrayerTimesCard initialData={data} onDateChange={fetchPrayerTimes} />
//     </div>
//   );
// }





'use client';

import PrayerTimesCard from "@/src/components/prayer/PrayerTimeCard";
import { useEffect, useState } from "react";

export default function PrayerPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تحويل التاريخ لـ DD-MM-YYYY
  const formatToDDMMYYYY = (date: Date) => {
    const dd = date.getDate().toString().padStart(2, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const fetchPrayerTimes = async (date?: Date) => {
    setLoading(true);

    try {
      const lat = 30.0444; // القاهرة مثال
      const lon = 31.2357;

      const formattedDate = date ? formatToDDMMYYYY(date) : formatToDDMMYYYY(new Date());

      const res = await fetch(`/api/prayer-times?lat=${lat}&lon=${lon}&date=${formattedDate}`);
      const result = await res.json();

      if (result.error) throw new Error(result.error);

      setData(result.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "فشل جلب مواقيت الصلاة");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes(); // جلب بيانات اليوم عند فتح الصفحة
  }, []);

  if (loading) return <div className="text-center mt-10 text-4xl">جاري تحميل مواقيت الصلاة...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!data) return null;

  return <div className="px-2"><PrayerTimesCard initialData={data} onDateChange={fetchPrayerTimes} /></div>;
}
