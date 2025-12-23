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



// fetch مباشر من aladhan API
import { PrayTimesInterface } from "@/src/interfaces/prayTimes.interface";

export async function getPrayTimes(latitude: number, longitude: number, date: string): Promise<PrayTimesInterface> {
  const res = await fetch(
    `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=5`
  );

  if (!res.ok) throw new Error("Failed to fetch prayer times");
  return res.json();
}
