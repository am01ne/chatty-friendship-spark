import { cn } from "@/lib/utils";
import { Message } from "@/lib/api";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "max-w-[70%] rounded-lg p-3 mb-2",
        isCurrentUser
          ? "ml-auto bg-primary text-white"
          : "mr-auto bg-secondary text-secondary-foreground"
      )}
    >
      <p>{message.msg}</p>
      <span className="text-xs opacity-70">
        {new Date(message.sent_at).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default MessageBubble;