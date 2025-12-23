// src/app/api/prayer-times/route.ts
import { NextResponse } from "next/server";
import { getPrayTimes } from "@/app/_actions/prayTimes.api";

// cache لمدة يومين (172800 ثانية)
const cache = new Map<string, { data: any; expiry: number }>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const date = searchParams.get("date"); // "DD-MM-YYYY"

  if (!lat || !lon || !date) {
    return NextResponse.json({ error: "lat, lon, date required" }, { status: 400 });
  }

  const cacheKey = `${lat}_${lon}_${date}`;
  const now = Date.now();

  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    if (cached.expiry > now) {
      return NextResponse.json(cached.data);
    } else {
      cache.delete(cacheKey);
    }
  }

  try {
    const data = await getPrayTimes(Number(lat), Number(lon), date);
    cache.set(cacheKey, { data, expiry: now + 172800 * 1000 }); // يومين
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "فشل جلب مواقيت الصلاة" }, { status: 500 });
  }
}
