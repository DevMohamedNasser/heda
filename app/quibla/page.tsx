'use client';

import { useEffect, useRef, useState } from "react";

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceAngle, setDeviceAngle] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const lastAngleRef = useRef(0);
  const smoothFactor = 0.15;

  /* =========================
     حساب زاوية القبلة (Bearing)
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
     جلب الموقع (بدون تحذير React)
     ========================= */
  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setTimeout(() => {
          setError("المتصفح لا يدعم تحديد الموقع");
        }, 0);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          setQiblaAngle(getQiblaAngle(latitude, longitude));
        },
        () => {
          setTimeout(() => {
            setError("فشل تحديد الموقع");
          }, 0);
        }
      );
    };

    getLocation();
  }, []);

  /* =========================
     قراءة البوصلة
     ========================= */
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;

      // iOS (الأدق)
      if (typeof (e as any).webkitCompassHeading === "number") {
        heading = (e as any).webkitCompassHeading;
      }
      // fallback (Android / Desktop)
      else if (typeof e.alpha === "number") {
        heading = e.alpha;
      }

      if (heading !== null) {
        const smooth =
          lastAngleRef.current +
          (heading - lastAngleRef.current) * smoothFactor;

        lastAngleRef.current = smooth;
        setDeviceAngle(smooth);
      }
    };

    const requestPermission = async () => {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        try {
          const res = await (DeviceOrientationEvent as any).requestPermission();
          if (res === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
          } else {
            setError("تم رفض الوصول للبوصلة");
          }
        } catch {
          setError("فشل الوصول للبوصلة");
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">{error}</p>
    );
  }

  if (qiblaAngle === null) {
    return (
      <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>
    );
  }

  /* =========================
     الزاوية النهائية (صح حسابيًا)
     ========================= */
  const magneticCorrection = 2; // ميل بسيط مع عقارب الساعة
  const arrowAngle =
    (qiblaAngle - deviceAngle + magneticCorrection + 360) % 360;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black px-4">
      <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        اتجاه القبلة
      </p>

      {/* البوصلة */}
      <div className="relative w-48 h-48 rounded-full bg-gray-800 dark:bg-gray-900">
        {/* الخط – بدايته ثابتة في المركز */}
        <div
          className="absolute left-1/2 top-1/2 w-[3px] h-[82px] bg-yellow-400 origin-top transition-transform duration-100"
          style={{
            transform: `translateX(-50%) rotate(${arrowAngle}deg)`
          }}
        />

        {/* رأس السهم – فوق ويلامس المحيط */}
        <div
          className="absolute left-1/2 top-[calc(50%-82px)] w-0 h-0
                     border-l-[7px] border-l-transparent
                     border-r-[7px] border-r-transparent
                     border-b-[14px] border-b-yellow-400"
          style={{
            transform: `translateX(-50%) rotate(${arrowAngle}deg)`
          }}
        />

        {/* الكعبة */}
        <span className="absolute left-1/2 top-1/2 
          -translate-x-1/2 -translate-y-1/2 text-3xl">
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
