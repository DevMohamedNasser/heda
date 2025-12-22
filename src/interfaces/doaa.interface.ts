export interface Adaiya {
  success: boolean
  totalCategories: number
  data: Doaa[]
}

export interface Doaa {
  id: number
  title: string
  text: string
  repeat: number
  source: string
}