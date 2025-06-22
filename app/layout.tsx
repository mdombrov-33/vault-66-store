import './globals.css'
import { VT323 } from 'next/font/google'
import { Roboto_Mono } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Container from '@/components/global/Container'
import Providers from './providers'
import { ClerkProvider } from '@clerk/nextjs'
import ChatLauncher from '@/components/ai-chat/ChatLauncher'
import GitHubButton from '@/components/global/GitHubButton'
import BootScreen from '@/components/global/BootScreen'
import CrtWrapper from '@/components/global/CrtWrapper'

const vt323 = VT323({
  variable: '--font-vt323',
  subsets: ['latin'],
  weight: '400',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${vt323.variable} ${robotoMono.variable} antialiased`}>
          <BootScreen />
          <Providers>
            <Navbar />
            <CrtWrapper>
              <Container className="py-20">{children}</Container>
            </CrtWrapper>
            <GitHubButton />
            <ChatLauncher />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
