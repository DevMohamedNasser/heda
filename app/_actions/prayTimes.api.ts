// import { PrayTimesInterface } from "@/src/interfaces/prayTimes.interface";

// export async function getPrayTimes(
//   latitude: number,
//   longitude: number,
//   date: string // "DD-MM-YYYY"
// ): Promise<PrayTimesInterface> {
//   const res = await fetch(
//     `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=5`,
//     { next: { revalidate: 60 * 60 * 24 } }
//   );

//   if (!res.ok) throw new Error('Failed to fetch prayer times');
//   return res.json();
// }


'use server';

import { Data } from "@/src/interfaces/prayTimes.interface";

export async function getPrayTimes(
  latitude: number,
  longitude: number,
  date?: string
): Promise<Data> { // ← الآن النوع Data
  const url = date
    ? `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=5`
    : `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=5`;

  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
  if (!res.ok) throw new Error("Failed to fetch prayer times");

  const json = await res.json();
  return json.data; // ← Data مباشرة
}
