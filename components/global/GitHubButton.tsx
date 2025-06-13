import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

function GitHubButton() {
  return (
    <Button
      asChild
      className="fixed bottom-5 left-5 hidden lg:flex items-center justify-center"
      size={'icon'}
    >
      <Link href="https://github.com/mdombrov-33/vault-66-store">
        <GitHubLogoIcon />
        <span className="sr-only">Open GitHub repository</span>
      </Link>
    </Button>
  )
}
export default GitHubButton
