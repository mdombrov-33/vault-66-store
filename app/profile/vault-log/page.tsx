import ChatWrapper from '@/components/profile/vault-log/ChatWrapper'
import { getAllMessages } from '@/utils/actions/live-chat'
import { getAuthUser } from '@/utils/auth/get-user'

async function VaultLogPage() {
  const user = await getAuthUser()
  const displayedName = user.firstName || user.username || 'Unknown'
  const senderAvatar = user.imageUrl || ''

  const messages = (await getAllMessages()) ?? []
  return (
    <ChatWrapper messages={messages} displayedName={displayedName} senderAvatar={senderAvatar} />
  )
}

export default VaultLogPage
