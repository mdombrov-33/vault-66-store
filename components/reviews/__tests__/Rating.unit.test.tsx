import { render, screen } from '@testing-library/react'
import Rating from '../Rating'

describe('Rating component', () => {
  it('renders 5 stars in total', () => {
    render(<Rating rating={3} />)
    const allStars = [
      ...screen.getAllByLabelText('filled-star'),
      ...screen.getAllByLabelText('empty-star'),
    ]
    expect(allStars).toHaveLength(5)
  })

  it('renders correct number of filled stars', () => {
    render(<Rating rating={2} />)
    const filledStars = screen.getAllByLabelText('filled-star')
    const emptyStars = screen.getAllByLabelText('empty-star')
    expect(filledStars).toHaveLength(2)
    expect(emptyStars).toHaveLength(3)
  })

  it('renders all filled stars when rating is 5', () => {
    render(<Rating rating={5} />)
    expect(screen.getAllByLabelText('filled-star')).toHaveLength(5)
  })

  it('renders all empty stars when rating is 0', () => {
    render(<Rating rating={0} />)
    expect(screen.getAllByLabelText('empty-star')).toHaveLength(5)
  })
})
