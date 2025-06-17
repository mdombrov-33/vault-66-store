'use server'
import db from '@/lib/db'
import { getAuthUser } from '../auth/get-user'
import { renderError } from '../render-error'
import { revalidatePath } from 'next/cache'

export async function createChatMessage(content: string) {
  const user = await getAuthUser()

  const senderName = user.firstName || user.username || 'Unknown'
  const clerkId = user.id
  const senderAvatar = user.imageUrl

  if (!content.trim()) return

  try {
    await db.chatMessage.create({
      data: {
        content,
        clerkId,
        senderName,
        senderAvatar,
      },
    })
    revalidatePath('/profile/vault-log')
  } catch (error) {
    renderError(error)
  }
}
export async function getAllMessages() {
  try {
    const messages = await db.chatMessage.findMany({
      orderBy: { sentAt: 'asc' },
    })
    return messages
  } catch (error) {
    renderError(error)
  }
}
