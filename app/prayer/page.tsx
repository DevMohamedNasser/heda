// 'use client';

// import { useEffect, useState } from "react";
// import { PrayTimesInterface } from "@/src/interfaces/prayTimes.interface";
// import { getPrayTimes } from "../_actions/prayTimes.api";
// import PrayerTimesCard from '../../src/components/prayer/PrayerTimeCard';

// export default function PrayerPage() {
//   const [data, setData] = useState<Date | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchPrayerTimes = async (date?: Date) => {
//     setLoading(true);
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         // format التاريخ باستخدام toLocaleDateString
//         const formattedDate = date
//           ? date.toLocaleDateString('en-GB') // "DD/MM/YYYY"
//               .split('/').join('-')          // "DD-MM-YYYY"
//           : new Date().toLocaleDateString('en-GB').split('/').join('-');

//         try {
//           const result = await getPrayTimes(latitude, longitude, formattedDate);
//           setData(result.data);
//           console.log('Prayer times:', result.data);
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

//   return (
//     <div>
      

//       {loading && <div className="text-center mt-10 text-4xl">جاري تحميل مواقيت الصلاة...</div>}
//       {error && <div className="text-center mt-10 text-red-500">{error}</div>}
//       {data && <PrayerTimesCard data={data} />}
//     </div>
//   );
// }







'use client';

import { useEffect, useState } from "react";
import { Data } from "@/src/interfaces/prayTimes.interface";
import { getPrayTimes } from "../_actions/prayTimes.api";
import PrayerTimesCard from "@/src/components/prayer/PrayerTimeCard";

export default function PrayerPage() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        // تحويل التاريخ إلى "DD-MM-YYYY"
        const formattedDate = date
          ? date.toLocaleDateString('en-GB').split('/').join('-')
          : new Date().toLocaleDateString('en-GB').split('/').join('-');

        try {
          const result = await getPrayTimes(latitude, longitude, formattedDate);
          setData(result); // ← Data مباشرة
          console.log('Prayer times:', result);
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
    fetchPrayerTimes(); // جلب مواقيت اليوم تلقائيًا عند تحميل الصفحة
  }, []);

  return (
    <div>
      {loading && <div className="text-center mt-10 text-4xl">جاري تحميل مواقيت الصلاة...</div>}
      {error && <div className="text-center mt-10 text-red-500">{error}</div>}
      {data && <PrayerTimesCard data={data} />}
    </div>
  );
}
