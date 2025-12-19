'use client';

import { useEffect, useState } from "react";

export default function QiblaPage() {
  const [angle, setAngle] = useState<number | null>(null); // زاوية القبلة
  const [rotatedAngle, setRotatedAngle] = useState<number>(0); // زاوية السهم بالنسبة للجهاز
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  // حساب زاوية القبلة من الموقع
  function getQiblaAngle(lat: number, lng: number) {
    const kaabaLat = 21.4225 * (Math.PI / 180);
    const kaabaLng = 39.8262 * (Math.PI / 180);

    const userLat = lat * (Math.PI / 180);
    const userLng = lng * (Math.PI / 180);

    const y = Math.sin(kaabaLng - userLng);
    const x =
      Math.cos(userLat) * Math.tan(kaabaLat) -
      Math.sin(userLat) * Math.cos(kaabaLng - userLng);
    const a = Math.atan2(y, x) * (180 / Math.PI);
    return (a + 360) % 360;
  }

  // الحصول على الموقع
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setAngle(getQiblaAngle(latitude, longitude));
      },
      () => setError("تم رفض الوصول للموقع")
    );
  }, []);

  // الدالة للتعامل مع دوران الجهاز
  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null && angle !== null) {
      const rotated = (angle - event.alpha + 360) % 360;
      setRotatedAngle(rotated);
    }
  };

  // طلب إذن البوصلة على iOS
  const requestPermission = () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
            window.addEventListener("deviceorientationabsolute", handleOrientation, true);
            setPermissionGranted(true);
          } else {
            setError("تم رفض الوصول للبوصلة");
          }
        })
        .catch(console.error);
    } else {
      // Android / Desktop
      window.addEventListener("deviceorientation", handleOrientation, true);
      window.addEventListener("deviceorientationabsolute", handleOrientation, true);
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
    };
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (angle === null) return <p>جاري تحديد اتجاه القبلة...</p>;

  if (!permissionGranted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <button
          onClick={requestPermission}
          className="p-3 bg-blue-500 text-white rounded-md"
        >
          السماح للبوصلة
        </button>
        <p className="mt-2 text-gray-700 text-sm">
          اضغط للسماح لتحديث اتجاه القبلة
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mb-4 text-lg">زاوية القبلة: {rotatedAngle.toFixed(2)}°</p>
      <div className="w-40 h-40 bg-red-500 rounded-full relative">
        {/* السهم يتحرك */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-2 h-20 bg-white origin-bottom transition-transform duration-100"
          style={{ transform: `rotate(${rotatedAngle}deg)` }}
        ></div>
        {/* رمز القبلة */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
          🕋
        </div>
      </div>
    </div>
  );
}
