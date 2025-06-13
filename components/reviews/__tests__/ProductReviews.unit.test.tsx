import { render, screen } from '@testing-library/react'
import ProductReviews from '../ProductReviews'

// Mock review data
vi.mock('@/utils/actions/review', () => ({
  fetchProductReviews: vi.fn(() =>
    Promise.resolve([
      {
        id: '1',
        comment: 'Great product!',
        rating: 5,
        authorImageUrl: '/img.jpg',
        authorName: 'John',
      },
    ])
  ),
}))

vi.mock('@/components/global/SectionTitle', () => ({
  default: ({ text }: { text: string }) => <h2>{text}</h2>,
}))

vi.mock('../ReviewCard', () => ({
  default: ({ reviewInfo }: any) => (
    <div>
      <p>{reviewInfo.comment}</p>
      <p>{reviewInfo.name}</p>
    </div>
  ),
}))

describe('ProductReviews component', () => {
  it('renders reviews with title', async () => {
    const jsx = await ProductReviews({ productId: '123' })

    // 👇 Now render the resolved JSX
    render(jsx)

    // Assertions
    expect(screen.getByRole('heading', { name: /item reviews/i })).toBeInTheDocument()
    expect(screen.getByText('Great product!')).toBeInTheDocument()
    expect(screen.getByText('John')).toBeInTheDocument()
  })
})
