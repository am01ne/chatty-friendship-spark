import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Chat } from "@/lib/api";

interface ChatListProps {
  chats: Chat[];
  currentUserId: number;
}

const ChatList = ({ chats, currentUserId }: ChatListProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {chats.map((chat) => (
        <Card
          key={chat.chatId}
          className="p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate(`/chat/${chat.chatId}`)}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
              {chat.user1_ID === currentUserId ? chat.user2_ID : chat.user1_ID}
            </div>
            <div>
              <h3 className="font-medium">
                User ID: {chat.user1_ID === currentUserId ? chat.user2_ID : chat.user1_ID}
              </h3>
              <p className="text-sm text-gray-500">Click to view chat</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ChatList;