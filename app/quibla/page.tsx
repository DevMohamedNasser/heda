// 'use client';

// import { useEffect, useState } from "react";

// export default function QiblaPage() {
//   const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
//   const [deviceAngle, setDeviceAngle] = useState<number>(0);
//   const [error, setError] = useState<string | null>(null);

//   /* حساب زاوية القبلة */
//   function getQiblaAngle(lat: number, lng: number) {
//     const kaabaLat = 21.4225 * Math.PI / 180;
//     const kaabaLng = 39.8262 * Math.PI / 180;

//     const userLat = lat * Math.PI / 180;
//     const userLng = lng * Math.PI / 180;

//     const y = Math.sin(kaabaLng - userLng);
//     const x =
//       Math.cos(userLat) * Math.tan(kaabaLat) -
//       Math.sin(userLat) * Math.cos(kaabaLng - userLng);

//     return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
//   }

//   /* جلب الموقع */
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("المتصفح لا يدعم تحديد الموقع");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       pos => {
//         const { latitude, longitude } = pos.coords;
//         setQiblaAngle(getQiblaAngle(latitude, longitude));
//       },
//       () => setError("فشل تحديد الموقع")
//     );
//   }, []);

//   /* دوران الجهاز */
//   useEffect(() => {
//     const handleOrientation = (e: DeviceOrientationEvent) => {
//       if (e.alpha !== null) {
//         setDeviceAngle(e.alpha);
//       }
//     };

//     window.addEventListener("deviceorientationabsolute", handleOrientation, true);
//     window.addEventListener("deviceorientation", handleOrientation, true);

//     return () => {
//       window.removeEventListener("deviceorientationabsolute", handleOrientation);
//       window.removeEventListener("deviceorientation", handleOrientation);
//     };
//   }, []);

//   if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
//   if (qiblaAngle === null)
//     return <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>;

//   const arrowAngle = (qiblaAngle - deviceAngle + 360) % 360;

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <p className="mb-4 text-lg font-semibold">
//         زاوية القبلة: {arrowAngle.toFixed(1)}°
//       </p>

//       {/* البوصلة */}
//       <div className="relative w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center">

//         {/* جسم السهم */}
//         <div
//           className="absolute bottom-1/2 left-1/2 w-1 h-20 bg-white origin-bottom transition-transform duration-75"
//           style={{
//             transform: `translateX(-50%) rotate(${arrowAngle}deg)`
//           }}
//         />

//         {/* رأس السهم (لامس المحيط) */}
//         <div
//           className="absolute left-1/2 bottom-[calc(50%-80px)]
//                      w-0 h-0
//                      border-l-[6px] border-l-transparent
//                      border-r-[6px] border-r-transparent
//                      border-b-12 border-b-white"
//           style={{
//             transform: `translateX(-50%) rotate(${arrowAngle}deg)`
//           }}
//         />

//         {/* الكعبة */}
//         <span className="absolute text-2xl">🕋</span>
//       </div>
//     </div>
//   );
// }







'use client';

import { useEffect, useState } from "react";

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceAngle, setDeviceAngle] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // حساب زاوية القبلة بدقة
  function getQiblaAngle(lat: number, lng: number) {
    const kaabaLat = 21.4225 * Math.PI / 180;
    const kaabaLng = 39.8262 * Math.PI / 180;

    const userLat = lat * Math.PI / 180;
    const userLng = lng * Math.PI / 180;

    const y = Math.sin(kaabaLng - userLng);
    const x =
      Math.cos(userLat) * Math.tan(kaabaLat) -
      Math.sin(userLat) * Math.cos(kaabaLng - userLng);

    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }

  // الحصول على الموقع الجغرافي
  useEffect(() => {
    if (!navigator.geolocation) {
      setTimeout(() => setError("المتصفح لا يدعم تحديد الموقع"), 0);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setQiblaAngle(getQiblaAngle(latitude, longitude));
      },
      () => setTimeout(() => setError("فشل تحديد الموقع"), 0)
    );
  }, []);

  // متابعة حركة الجهاز وتحديث السهم
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let alpha = e.alpha ?? 0;

      // iOS
      const webkitHeading = (e as any).webkitCompassHeading;
      if (typeof webkitHeading === "number") alpha = webkitHeading;

      requestAnimationFrame(() => setDeviceAngle(alpha));
    };

    // طلب إذن على iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: "granted" | "denied") => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientationabsolute", handleOrientation, true);
          } else setError("تم رفض الوصول للبوصلة");
        })
        .catch(() => setError("فشل الوصول للبوصلة"));
    } else {
      window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
    };
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (qiblaAngle === null)
    return <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>;

  const arrowAngle = (qiblaAngle - deviceAngle + 360) % 360;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black px-4">
      <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        زاوية القبلة: {arrowAngle.toFixed(1)}°
      </p>

      {/* البوصلة */}
      <div className="relative w-48 h-48 rounded-full bg-gray-800 dark:bg-gray-900 flex items-center justify-center">
        {/* جسم السهم */}
        <div
          className="absolute bottom-1/2 left-1/2 w-1 h-24 bg-white dark:bg-yellow-400 origin-bottom transition-transform duration-100 ease-out"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        {/* رأس السهم */}
        <div
          className="absolute left-1/2 bottom-[calc(50%-96px)] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-12 border-b-white dark:border-b-yellow-400"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        {/* الكعبة */}
        <span className="absolute text-3xl">🕋</span>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm max-w-sm text-center">
        حرك جهازك لتوجيه السهم نحو القبلة. تعمل البوصلة مع معايرة تلقائية على الأجهزة الحديثة.
      </p>
    </div>
  );
}
