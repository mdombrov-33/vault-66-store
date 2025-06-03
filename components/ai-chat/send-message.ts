import { SendMessageArgs } from "@/types/ai-chat";

export async function sendMessage({
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

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");
      let errorBody;

      if (contentType?.includes("application/json")) {
        errorBody = await response.json();
      } else {
        errorBody = await response.text();
      }

      throw new Error(
        `Server error: ${response.status}\nDetails: ${JSON.stringify(
          errorBody
        )}`
      );
    }

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
