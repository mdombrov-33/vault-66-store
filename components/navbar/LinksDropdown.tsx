import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LuAlignLeft } from 'react-icons/lu'
import Link from 'next/link'
import { Button } from '../ui/button'
import { NAV_LINKS } from '@/data/nav'
import UserIcon from './UserIcon'
import { SignInButton, SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs'
import SignOutLink from './SignOutLink'
import { auth } from '@clerk/nextjs/server'

async function LinksDropdown() {
  const { userId } = await auth()
  const isAdmin = userId === process.env.ADMIN_USER_ID
  const isTestAdmin = userId === process.env.TEST_ADMIN_USER_ID?.trim()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left text-xl">Resume Trading</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left text-xl">Start Trading</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {NAV_LINKS.map((navLink) => {
            if (navLink.label === 'admin dashboard' && !isAdmin && !isTestAdmin) return null
            return (
              <DropdownMenuItem key={navLink.href}>
                <Link className="capitalize text-xl" href={navLink.href}>
                  {navLink.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
