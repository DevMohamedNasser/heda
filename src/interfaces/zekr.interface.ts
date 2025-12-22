export interface Azkar {
  success: boolean
  totalCategories: number
  data: Zekr[]
}

export interface Zekr {
  id: number
  title: string
  groub: Text[]
}

export interface Text {
  id: number
  text: string
  repeat: number
  source: string
}