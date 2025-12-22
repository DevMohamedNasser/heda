import { HadithsResponse } from "@/src/interfaces/hadiths.interface";

export async function getHadiths(slug : string) {
    
    const res = await fetch(`https://hadithapi.com/public/api/hadiths?apiKey=$2y$10$okjiXGEAZP3pitWFGIGrROY1LspKBBRJKsgmCkbRANdKgLTXpAW&hadiths=${slug}`,
        { next: { revalidate: 60 * 60 * 24 } }
    )
    const data : HadithsResponse = await res.json();
    return data;
}