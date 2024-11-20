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
        "max-w-[70%] rounded-2xl p-4 mb-2",
        isCurrentUser
          ? "ml-auto bg-blue-500/20 backdrop-blur-sm text-white"
          : "mr-auto bg-white/10 backdrop-blur-sm text-white"
      )}
    >
      <p className="mb-1">{message.msg}</p>
      <span className="text-xs text-white/70">
        {new Date(message.sent_at).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default MessageBubble;