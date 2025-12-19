"use client";

import { useEffect, useState } from "react";
import { PrayTimesInterface } from "@/src/interfaces/prayTimes.interface";
import { getPrayTimes } from "@/app/_actions/prayTimes.api";

export default function HandleLocations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prayTimes, setPrayTimes] = useState<PrayTimesInterface | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const formattedDate = new Date()
          .toLocaleDateString("en-GB")
          .split("/")
          .join("-"); // اليوم الحالي

        try {
          const data = await getPrayTimes(latitude, longitude, formattedDate);
          setPrayTimes(data);
        } catch (err) {
          setError("Failed to fetch prayer times");
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permission denied or unable to fetch location");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading prayer times...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Prayer Times:</h2>
      {prayTimes ? (
        <ul>
          {Object.entries(prayTimes.data.timings).map(([name, time]) => (
            <li key={name}>
              {name}: {time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No prayer times available</p>
      )}
    </div>
  );
}
