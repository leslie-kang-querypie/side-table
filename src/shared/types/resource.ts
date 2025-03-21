export interface Resource {
  id: string
  title: string
  description: string
  category: "code" | "design"
  thumbnail: string
  preview: string
  fullContent: string
  downloads: number
  stars: number
  views: number
}

