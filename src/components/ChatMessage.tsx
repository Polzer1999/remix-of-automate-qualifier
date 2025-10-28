import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  const isAssistant = role === "assistant";

  return (
    <div
      className={`flex gap-3 mb-4 animate-fade-in ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isAssistant
            ? "bg-card text-card-foreground shadow-soft"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
          {isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />}
        </p>
      </div>
      {!isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};