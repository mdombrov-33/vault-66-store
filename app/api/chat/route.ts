import { vault66Prompt } from '@/components/ai-chat/prompt'
import { getAuthUser } from '@/utils/auth/get-user'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body
    const user = await getAuthUser(false)

    const systemMessage = {
      role: 'system',
      content: vault66Prompt,
    }

    const fullMessages = [systemMessage, ...messages]

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: fullMessages,
        max_tokens: 1000,
        ...(user?.id && { user: user.id }),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenRouter API error:', errorData)
      return NextResponse.json({ error: 'Failed to fetch response from AI model' }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json({
      message: data.choices?.[0]?.message || {
        role: 'assistant',
        content: 'Sorry, I couldn’t respond.',
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
