'use client';

import { useEffect, useState, useRef } from "react";

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceAngle, setDeviceAngle] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const lastAngleRef = useRef(0);
  const smoothFactor = 0.15;

  /* =========================
     حساب زاوية القبلة (صحيح 100%)
     ========================= */
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

  /* =========================
     جلب الموقع
     ========================= */
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setQiblaAngle(getQiblaAngle(latitude, longitude));
      },
      () => setError("فشل تحديد الموقع")
    );
  }, []);

  /* =========================
     قراءة البوصلة
     ========================= */
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;

      // أدق قراءة (iOS)
      if (typeof (e as any).webkitCompassHeading === "number") {
        heading = (e as any).webkitCompassHeading;
      }
      // fallback
      else if (typeof e.alpha === "number") {
        heading = 360 - e.alpha;
      }

      if (heading !== null) {
        const smooth =
          lastAngleRef.current +
          (heading - lastAngleRef.current) * smoothFactor;

        lastAngleRef.current = smooth;
        setDeviceAngle(smooth);
      }
    };

    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((res: string) => {
          if (res === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
          } else setError("تم رفض الوصول للبوصلة");
        })
        .catch(() => setError("فشل الوصول للبوصلة"));
    } else {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (qiblaAngle === null) return <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>;

  /* =========================
     تصحيح بسيط جدًا (2°) بسبب المجال المغناطيسي
     ========================= */
  const magneticCorrection = -2;

  const arrowAngle =
    (qiblaAngle - deviceAngle + magneticCorrection + 360) % 360;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black px-4">
      <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        اتجاه القبلة
      </p>

      {/* البوصلة */}
      <div className="relative w-48 h-48 rounded-full bg-gray-800 dark:bg-gray-900">
        {/* السهم (مركزه منتصف الدائرة) */}
        <div
          className="absolute left-1/2 top-1/2 w-[3px] h-[96px] bg-yellow-400 origin-bottom transition-transform duration-100"
          style={{
            transform: `translateX(-50%) rotate(${arrowAngle}deg)`
          }}
        />

        {/* رأس السهم (فوق) */}
        <div
          className="absolute left-1/2 top-[calc(50%-96px)] w-0 h-0
                     border-l-[7px] border-l-transparent
                     border-r-[7px] border-r-transparent
                     border-b-[14px] border-b-yellow-400"
          style={{
            transform: `translateX(-50%) rotate(${arrowAngle}deg)`
          }}
        />

        {/* الكعبة */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          🕋
        </span>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm max-w-sm text-center">
        ⚠️ اتجاه القبلة يعتمد على البوصلة وقد يتأثر بالمجال المغناطيسي للأرض.
        يُفضل معايرة الهاتف بتحريكه على شكل رقم 8.
      </p>
    </div>
  );
}
