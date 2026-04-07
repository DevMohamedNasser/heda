'use client';

import { useEffect, useRef, useState } from "react";

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastHeadingRef = useRef(0);
  const smoothFactor = 0.2;

  // ✅ حساب اتجاه القبلة (دقيق)
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

  // ✅ تقليل اهتزاز البوصلة
  function smoothHeading(prev: number, next: number, factor: number) {
    let diff = next - prev;

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    return prev + diff * factor;
  }

  // ✅ تحديد الموقع
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم GPS");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const angle = getQiblaAngle(
          pos.coords.latitude,
          pos.coords.longitude
        );
        setQiblaAngle(angle);
      },
      () => setError("فشل تحديد الموقع")
    );
  }, []);

  // ✅ تشغيل البوصلة
  useEffect(() => {
    if (qiblaAngle === null) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;

      // 📱 iOS (الأدق)
      if ((e as any).webkitCompassHeading !== undefined) {
        heading = (e as any).webkitCompassHeading;
      }

      // 🤖 Android حديث
      else if (e.absolute && e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }

      // 🟡 fallback
      else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }

      if (heading === null) return;

      const smooth = smoothHeading(
        lastHeadingRef.current,
        heading,
        smoothFactor
      );

      lastHeadingRef.current = smooth;
      setDeviceHeading(smooth);
    };

    const startCompass = () => {
      window.addEventListener("deviceorientation", handleOrientation, true);
    };

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try {
          const res = await (DeviceOrientationEvent as any).requestPermission();
          if (res === "granted") startCompass();
          else setError("تم رفض البوصلة");
        } catch {
          setError("فشل تشغيل البوصلة");
        }
      } else {
        startCompass();
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [qiblaAngle]);

  // ✅ حساب الاتجاه النهائي
  const arrowAngle =
    qiblaAngle !== null && deviceHeading !== null
      ? (qiblaAngle - deviceHeading + 360) % 360
      : null;

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">{error}</p>
    );
  }

  if (arrowAngle === null) {
    return (
      <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black px-4">
      <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        اتجاه القبلة: {arrowAngle.toFixed(1)}°
      </p>

      <div className="relative w-48 h-48 rounded-full bg-gray-800 dark:bg-gray-900 shadow-lg">
        
        {/* السهم */}
        <div
          className="absolute left-1/2 top-1/2 w-[3px] h-[82px] bg-yellow-400 origin-top transition-transform duration-75"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />

        {/* رأس السهم */}
        <div
          className="absolute left-1/2 top-[calc(50%-82px)] w-0 h-0
          border-l-[7px] border-l-transparent
          border-r-[7px] border-r-transparent
          border-b-[14px] border-b-yellow-400 transition-transform duration-75"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />

        {/* الكعبة */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          🕋
        </span>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm max-w-sm text-center">
        ⚠️ لو الاتجاه مش مظبوط، حرّك الموبايل على شكل 8 (∞) لمعايرة البوصلة.
      </p>
    </div>
  );
}