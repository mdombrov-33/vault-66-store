import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import AddToCart from '../AddToCart'
import { useAuth } from '@clerk/nextjs'

const playClickMock = vi.fn()

vi.mock('@/components/form/FormContainer', () => ({
  default: ({ children }: any) => <form>{children}</form>,
}))

vi.mock('@clerk/nextjs', () => ({
  useAuth: vi.fn(),
  SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/hooks/useSoundPlayer', () => ({
  useSoundPlayer: () => ({
    playClick: playClickMock,
  }),
}))

describe('AddToCart component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders sign in button when user is not authenticated', () => {
    ;(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({ userId: null })

    render(<AddToCart productId="123" />)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    expect(signInButton).toBeInTheDocument()
  })

  it('renders add to supply bin button when user is authenticated', () => {
    ;(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      userId: 'user123',
    })

    render(<AddToCart productId="123" />)
    const addToSupplyBinButton = screen.getByRole('button', {
      name: /add to supply bin/i,
    })
    expect(addToSupplyBinButton).toBeInTheDocument()
  })

  it('calls playClick when add to supply bin button is clicked', async () => {
    const user = userEvent.setup()
    ;(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      userId: 'user123',
    })

    render(<AddToCart productId="123" />)
    const addToSupplyBinButton = screen.getByRole('button', {
      name: /add to supply bin/i,
    })

    await user.click(addToSupplyBinButton)
    expect(playClickMock).toHaveBeenCalledTimes(1)
  })
})
