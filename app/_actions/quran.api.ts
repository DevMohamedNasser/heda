'use server';

import { SuwarResponse } from "@/src/interfaces/quran.interface";
import { SurahResponse } from "@/src/interfaces/realSurah.interface";

export async function getSuwar(lang = 'ar') {

    const res = await fetch(`https://mp3quran.net/api/v3/suwar?language=${lang}`, {
        next: {
            revalidate: 60 * 60 * 24
        }
    });

    const data : SuwarResponse = await res.json();
    return data.suwar;
}

export async function getSurah(id : string) {

    const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.hafs`, {
        next: {
            revalidate: 60 * 60 * 24
        }
    });

    const data : SurahResponse = await res.json();
    return data.data;
}