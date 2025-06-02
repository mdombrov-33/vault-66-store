import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo" if no GPT-4 access
      messages,
      max_tokens: 500,
    });

    return NextResponse.json({ message: completion.choices[0].message });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
