'use client';

import { useEffect, useRef, useState } from "react";

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastHeadingRef = useRef(0);
  const smoothFactor = 0.18;
  const absoluteWorking = useRef(false);

  function getQiblaAngle(lat: number, lng: number): number {
    const kaabaLat = 21.4225 * (Math.PI / 180);
    const kaabaLng = 39.8262 * (Math.PI / 180);
    const userLat = lat * (Math.PI / 180);
    const userLng = lng * (Math.PI / 180);

    const y = Math.sin(kaabaLng - userLng);
    const x =
      Math.cos(userLat) * Math.tan(kaabaLat) -
      Math.sin(userLat) * Math.cos(kaabaLng - userLng);

    return ((Math.atan2(y, x) * 180 / Math.PI + 360) % 360);
  }

  function smoothHeading(prev: number, next: number, factor: number): number {
    let diff = next - prev;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return prev + diff * factor;
  }

  const normalize = (angle: number) => ((angle % 360) + 360) % 360;

  // GPS
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const angle = getQiblaAngle(pos.coords.latitude, pos.coords.longitude);
        setQiblaAngle(angle);
      },
      () => setError("فشل تحديد الموقع"),
      { enableHighAccuracy: true }
    );
  }, []);

  // Compass
  useEffect(() => {
    if (qiblaAngle === null) return;

    const handleAbsolute = (e: DeviceOrientationEvent) => {
      if (e.alpha === null) return;
      absoluteWorking.current = true;

      let heading = normalize(360 - e.alpha);
      const smooth = smoothHeading(lastHeadingRef.current, heading, smoothFactor);
      lastHeadingRef.current = smooth;
      setDeviceHeading(smooth);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (absoluteWorking.current) return;

      let heading: number | null = null;
      if (typeof (e as any).webkitCompassHeading === "number") {
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        heading = normalize(360 - e.alpha);
      }

      if (heading === null) return;
      const smooth = smoothHeading(lastHeadingRef.current, heading, smoothFactor);
      lastHeadingRef.current = smooth;
      setDeviceHeading(smooth);
    };

    const startListening = () => {
      window.addEventListener("deviceorientationabsolute", handleAbsolute as EventListener, { passive: true });
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    };

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try {
          const res = await (DeviceOrientationEvent as any).requestPermission();
          if (res === "granted") startListening();
          else setError("تم رفض الوصول إلى البوصلة");
        } catch {
          setError("فشل الوصول إلى البوصلة");
        }
      } else {
        startListening();
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleAbsolute as EventListener);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [qiblaAngle]);

  // ←←← CLOCKWISE ROTATION FIX ←←←
  const arrowAngle =
    qiblaAngle !== null && deviceHeading !== null
      ? normalize(deviceHeading - qiblaAngle)   // ← This makes it rotate clockwise
      : null;

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (arrowAngle === null) return <p className="text-center mt-10">جاري تحديد اتجاه القبلة...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black px-4">
      <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        اتجاه القبلة: {arrowAngle.toFixed(1)}°
      </p>

      <div className="relative w-64 h-64 rounded-full bg-gray-800 dark:bg-gray-900 shadow-xl">
        <div className="absolute inset-0 border-8 border-gray-700 dark:border-gray-600 rounded-full" />

        {/* Qibla Arrow - now rotates clockwise */}
        <div
          className="absolute left-1/2 top-1/2 w-[4px] h-[110px] bg-yellow-400 origin-bottom transition-transform duration-75 ease-out"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />
        <div
          className="absolute left-1/2 -top-[6px] w-0 h-0 
                     border-l-[10px] border-l-transparent 
                     border-r-[10px] border-r-transparent 
                     border-b-[22px] border-b-yellow-400 
                     transition-transform duration-75 ease-out"
          style={{ transform: `translateX(-50%) rotate(${arrowAngle}deg)` }}
        />

        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-md">
          🕋
        </span>

        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white">N</div>
      </div>

      <p className="mt-8 text-gray-700 dark:text-gray-300 text-sm max-w-sm text-center leading-relaxed">
        ⚠️ حرّك الهاتف بشكل رقم 8 لمعايرة البوصلة<br />
        الاتجاه محسوب بدقة حسب موقعك
      </p>
    </div>
  );
}