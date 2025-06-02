import { SendMessageArgs } from "@/types/ai-chat";

export async function handleSendMessage({
  input,
  setInput,
  messages,
  setMessages,
  setIsLoading,
}: SendMessageArgs): Promise<void> {
  if (!input.trim()) return;

  const newMessages = [...messages, { role: "user", content: input }];
  setMessages(newMessages);
  setInput("");

  try {
    setIsLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();

    if (data.message) {
      setMessages((prev) => [...prev, { ...data.message, hasAnimated: false }]);
    }
  } catch (error) {
    console.error("Error sending message:", error);

    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: "Uh-oh! The Vault's AI is glitching. Give it another shot.",
        hasAnimated: true,
      },
    ]);
  } finally {
    setIsLoading(false);
  }
}
