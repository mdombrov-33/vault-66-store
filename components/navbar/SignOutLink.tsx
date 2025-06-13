'use client'

import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import { toast } from 'sonner'

function SignOutLink() {
  const handleLogout = () => {
    toast.success('You have successfully logged out')
  }

  return (
    <SignOutButton>
      <Link href="/" className="w-full text-xl text-left" onClick={handleLogout}>
        Logout
      </Link>
    </SignOutButton>
  )
}

export default SignOutLink
