'use client';

import { useEffect, useRef, useState } from "react";

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastHeadingRef = useRef(0);
  const headingBuffer = useRef<number[]>([]);
  const smoothFactor = 0.08;
  const stableThreshold = 1.5; // أقل تغيير مسموح للثبات

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

  function smoothHeading(prev: number, next: number, factor: number) {
    let diff = next - prev;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return prev + diff * factor;
  }

  useEffect(() => {
    if (!qiblaAngle) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;

      if (typeof (e as any).webkitCompassHeading === "number") {
        heading = (e as any).webkitCompassHeading; // iOS true north
      } else if (typeof e.alpha === "number") {
        heading = (360 - e.alpha) % 360; // Android magnetic north
      }

      if (heading === null) return;

      // buffer آخر 10 قراءات لتثبيت السهم
      headingBuffer.current.push(heading);
      if (headingBuffer.current.length > 10) headingBuffer.current.shift();

      // حساب متوسط القراءة المستقرة
      const max = Math.max(...headingBuffer.current);
      const min = Math.min(...headingBuffer.current);
      if (max - min < stableThreshold) {
        // smoothing
        const avgHeading = headingBuffer.current.reduce((a, b) => a + b, 0) / headingBuffer.current.length;
        const smooth = smoothHeading(lastHeadingRef.current, avgHeading, smoothFactor);
        lastHeadingRef.current = smooth;
        setDeviceHeading(smooth);
      }
    };

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try {
          const res = await (DeviceOrientationEvent as any).requestPermission();
          if (res === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
          } else setError("تم رفض الوصول للبوصلة");
        } catch {
          setError("فشل الوصول للبوصلة");
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    };

    requestPermission();

    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [qiblaAngle]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (qiblaAngle === null || deviceHeading === null)
    return <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>;

  const arrowAngle = (qiblaAngle - deviceHeading + 360) % 360;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black px-4">
      <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        زاوية القبلة: {arrowAngle.toFixed(1)}°
      </p>
      <div className="relative w-48 h-48 rounded-full bg-gray-800 dark:bg-gray-900">
        <div
          className="absolute left-1/2 top-1/2 w-[3px] h-[82px] bg-yellow-400 origin-top transition-transform duration-100"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        <div
          className="absolute left-1/2 top-[calc(50%-82px)] w-0 h-0
                     border-l-[7px] border-l-transparent
                     border-r-[7px] border-r-transparent
                     border-b-[14px] border-b-yellow-400"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        <span className="absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2 text-3xl">
          🕋
        </span>
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm max-w-sm text-center">
        ⚠️ اتجاه القبلة يعتمد على البوصلة وقد يتأثر بالمجال المغناطيسي للأرض.
        يُفضل معايرة الهاتف بتحريكه على شكل رقم 7.
      </p>
    </div>
  );
}
