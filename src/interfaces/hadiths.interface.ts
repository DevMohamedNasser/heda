export interface HadithsResponse {
  status: number
  message: string
  hadiths: Hadiths
}

export interface Hadiths {
  current_page: number
  data: Hadith[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Hadith {
  id: number
  hadithNumber: string
  englishNarrator: string
  hadithEnglish: string
  hadithUrdu: string
  urduNarrator: string
  hadithArabic: string
  headingArabic?: string
  headingUrdu?: string
  headingEnglish?: string
  chapterId: string
  bookSlug: string
  volume: string
  status: string
  book: Book
  chapter: Chapter
}

export interface Book {
  id: number
  bookName: string
  writerName: string
  aboutWriter: any
  writerDeath: string
  bookSlug: string
}

export interface Chapter {
  id: number
  chapterNumber: string
  chapterEnglish: string
  chapterUrdu: string
  chapterArabic: string
  bookSlug: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}
