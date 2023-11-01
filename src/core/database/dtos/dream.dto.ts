export interface CreateDreamDto {
  userId?: number,
  name: string,
  text: string,
  question: string
}

export interface AskDreamDto {
  userId?: number,
  name: string,
  question: string
}
