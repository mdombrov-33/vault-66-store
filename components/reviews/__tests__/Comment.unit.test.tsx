import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Comment from '../Comment'

describe('Comment component', () => {
  const shortComment = 'This is a short comment.'
  const longComment = 'a'.repeat(150)

  it('renders full comment when comment length is 100 or less', () => {
    render(<Comment comment={shortComment} />)
    expect(screen.getByText(shortComment)).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('shows "Show more" button when comment is longer than 100 characters', () => {
    render(<Comment comment={longComment} />)
    expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument()
  })

  it('shows full comment after clicking "Show more"', async () => {
    const user = userEvent.setup()
    render(<Comment comment={longComment} />)
    const button = screen.getByRole('button', { name: /show more/i })
    await user.click(button)
    expect(screen.getByText(longComment)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument()
  })

  it('shows truncated comment again after clicking "Show less"', async () => {
    const user = userEvent.setup()
    render(<Comment comment={longComment} />)
    const showMoreButton = screen.getByRole('button', { name: /show more/i })
    await user.click(showMoreButton)

    const showLessButton = screen.getByRole('button', { name: /show less/i })
    await user.click(showLessButton)

    expect(screen.getByText(longComment.slice(0, 100) + '...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument()
  })
})
