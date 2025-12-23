'use client';

import { useEffect, useRef, useState } from 'react';

export default function QiblaPage() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastHeading = useRef(0);
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
     تحديد الموقع
     ========================= */
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('المتصفح لا يدعم تحديد الموقع');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setQiblaAngle(getQiblaAngle(latitude, longitude));
      },
      () => setError('فشل تحديد الموقع')
    );
  }, []);

  /* =========================
     قراءة البوصلة (حل جذري)
     ========================= */
  useEffect(() => {
    function onOrientation(e: DeviceOrientationEvent) {
      let angle: number | null = null;

      // أدق حل (iOS)
      if (typeof (e as any).webkitCompassHeading === 'number') {
        angle = (e as any).webkitCompassHeading;
      }
      // fallback
      else if (typeof e.alpha === 'number') {
        angle = 360 - e.alpha;
      }

      if (angle !== null) {
        const smooth =
          lastHeading.current +
          (angle - lastHeading.current) * smoothFactor;

        lastHeading.current = smooth;
        setHeading(smooth);
      }
    }

    if (
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((res: string) => {
          if (res === 'granted') {
            window.addEventListener(
              'deviceorientation',
              onOrientation,
              true
            );
          } else {
            setError('تم رفض إذن البوصلة');
          }
        })
        .catch(() => setError('فشل الوصول للبوصلة'));
    } else {
      window.addEventListener('deviceorientation', onOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, []);

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">{error}</p>
    );

  if (qiblaAngle === null || heading === null)
    return (
      <p className="text-center mt-10">
        جاري تحديد اتجاه القبلة...
      </p>
    );

  /* =========================
     الزاوية الصحيحة بدون أي correction
     ========================= */
  const arrowAngle = (qiblaAngle - heading + 360) % 360;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-black">
      <p className="mb-3 text-lg font-semibold">
        اتجاه القبلة
      </p>

      <div className="relative w-56 h-56 rounded-full bg-gray-800 dark:bg-gray-900">
        {/* السهم (مركزه الكعبة ويلامس محيط الدائرة) */}
        <div
          className="absolute left-1/2 top-1/2 w-[2px] h-[110px] bg-yellow-400 origin-bottom transition-transform duration-100"
          style={{
            transform: `translateX(-50%) rotate(${arrowAngle}deg)`
          }}
        />

        {/* رأس السهم */}
        <div
          className="absolute left-1/2 top-[calc(50%-110px)] w-0 h-0
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

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center max-w-xs">
        حرّك الهاتف على شكل رقم 8 لمعايرة البوصلة
      </p>
    </div>
  );
}
