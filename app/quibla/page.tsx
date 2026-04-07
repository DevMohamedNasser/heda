'use client';

import { useEffect, useRef, useState } from "react";

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastHeadingRef = useRef(0);
  const smoothFactor = 0.15;
  const absoluteWorking = useRef(false);

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

  function smoothHeading(prev: number, next: number, factor: number) {
    let diff = next - prev;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return prev + diff * factor;
  }

  // GPS
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم تحديد الموقع");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setQiblaAngle(getQiblaAngle(pos.coords.latitude, pos.coords.longitude));
      },
      () => setError("فشل تحديد الموقع")
    );
  }, []);

  // البوصلة
  useEffect(() => {
    if (qiblaAngle === null) return;

    // handler للحدث المطلق (Android الأحدث)
    const handleAbsolute = (e: DeviceOrientationEvent) => {
      if (e.alpha === null) return;
      absoluteWorking.current = true;
      const heading = (360 - e.alpha) % 360;
      const smooth = smoothHeading(lastHeadingRef.current, heading, smoothFactor);
      lastHeadingRef.current = smooth;
      setDeviceHeading(smooth);
    };

    // handler للحدث العادي (iOS + Android القديم)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // لو absolute شغال، تجاهل الحدث العادي تماماً
      if (absoluteWorking.current) return;

      let heading: number | null = null;

      // iOS
      if (typeof (e as any).webkitCompassHeading === "number") {
        heading = (e as any).webkitCompassHeading;
      }
      // Android قديم (alpha نسبي — مش مثالي لكن أحسن من لا شيء)
      else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }

      if (heading === null) return;
      const smooth = smoothHeading(lastHeadingRef.current, heading, smoothFactor);
      lastHeadingRef.current = smooth;
      setDeviceHeading(smooth);
    };

    const startListening = () => {
      window.addEventListener("deviceorientationabsolute", handleAbsolute as EventListener, true);
      window.addEventListener("deviceorientation", handleOrientation, true);
    };

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try {
          const res = await (DeviceOrientationEvent as any).requestPermission();
          if (res === "granted") startListening();
          else setError("تم رفض الوصول للبوصلة");
        } catch {
          setError("فشل الوصول للبوصلة");
        }
      } else {
        startListening();
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleAbsolute as EventListener, true);
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [qiblaAngle]);

  const arrowAngle = qiblaAngle !== null && deviceHeading !== null
    ? (qiblaAngle - deviceHeading + 360) % 360
    : null;

  if (error) return (
    <p className="text-red-500 text-center mt-10">{error}</p>
  );

  if (arrowAngle === null) return (
    <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black px-4">
      <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        زاوية القبلة: {arrowAngle.toFixed(1)}°
      </p>

      <div className="relative w-48 h-48 rounded-full bg-gray-800 dark:bg-gray-900">
        <div
          className="absolute left-1/2 top-1/2 w-[3px] h-[82px] bg-yellow-400 origin-top transition-transform duration-75"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        <div
          className="absolute left-1/2 top-[calc(50%-82px)] w-0 h-0
                     border-l-[7px] border-l-transparent
                     border-r-[7px] border-r-transparent
                     border-b-[14px] border-b-yellow-400 transition-transform duration-75"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          🕋
        </span>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm max-w-sm text-center">
        ⚠️ اتجاه القبلة محسوب بدقة حسب الموقع الجغرافي،
        وحركة السهم تعتمد على بوصلة الجهاز وقد تتأثر بالمجالات المغناطيسية.
      </p>
    </div>
  );
}