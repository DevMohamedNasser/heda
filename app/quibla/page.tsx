'use client';

import { useEffect, useState, useRef } from "react";

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceAngle, setDeviceAngle] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const lastAlphaRef = useRef<number>(0); 
  const alphaFilter = 0.1; 

  // حساب زاوية القبلة
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

  // جلب الموقع
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

  // متابعة حركة الجهاز
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let alpha = e.alpha ?? 0;
      const webkitHeading = (e as any).webkitCompassHeading;
      if (typeof webkitHeading === "number") alpha = webkitHeading;

      // Low-pass filter
      alpha = lastAlphaRef.current + (alpha - lastAlphaRef.current) * alphaFilter;
      lastAlphaRef.current = alpha;

      requestAnimationFrame(() => setDeviceAngle(alpha));
    };

    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: "granted" | "denied") => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientationabsolute", handleOrientation, true);
          } else setTimeout(() => setError("تم رفض الوصول للبوصلة"), 0);
        })
        .catch(() => setTimeout(() => setError("فشل الوصول للبوصلة"), 0));
    } else {
      window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
    };
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (qiblaAngle === null) return <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>;

  // إضافة تصحيح بسيط عكس عقارب الساعة
  const correction = -10; 
  const arrowAngle = (qiblaAngle - deviceAngle + correction + 360) % 360;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black px-4">
      <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        زاوية القبلة: {arrowAngle.toFixed(1)}°
      </p>

      {/* البوصلة */}
      <div className="relative w-48 h-48 rounded-full bg-gray-800 dark:bg-gray-900 flex items-center justify-center">
        {/* جسم السهم */}
        <div
          className="absolute top-1/2 left-1/2 w-1 h-24 bg-white dark:bg-yellow-400 origin-bottom transition-transform duration-100 ease-out"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        {/* رأس السهم فوق الدائرة */}
        <div
          className="absolute left-1/2 top-[calc(50%-96px)] w-0 h-0 
                     border-l-[6px] border-l-transparent 
                     border-r-[6px] border-r-transparent 
                     border-t-12 border-t-white dark:border-t-yellow-400"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        {/* الكعبة */}
        <span className="absolute text-3xl">🕋</span>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm max-w-sm text-center">
        حرك جهازك لتوجيه السهم نحو القبلة. السهم يتحرك بسلاسة مع معايرة تلقائية.
      </p>
    </div>
  );
}