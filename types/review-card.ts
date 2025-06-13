export type ReviewCardProps = {
  reviewInfo: {
    comment: string
    rating: number
    name: string
    image: string
  }
  children?: React.ReactNode
}
