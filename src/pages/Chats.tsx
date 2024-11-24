import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, UserPlus, LogOut } from "lucide-react";
import { inviteFriend, getChats, Chat } from "@/lib/api";

const Chats = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [friendId, setFriendId] = useState("");
  const currentUserId = localStorage.getItem("currentUserId");

  useEffect(() => {
    if (!currentUserId) {
      navigate("/");
      return;
    }
    
    const fetchChats = async () => {
      const data = await getChats(parseInt(currentUserId));
      setChats(data);
    };

    fetchChats();
  }, [currentUserId, navigate]);

  const handleAddFriend = async () => {
    if (!friendId || !currentUserId) return;
    const newChat = await inviteFriend(parseInt(currentUserId), parseInt(friendId));
    if (newChat) {
      setChats([...chats, newChat]);
      setFriendId("");
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <User size={24} className="text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Your Chats</h1>
                <p className="text-sm text-white/70">ID: {currentUserId}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="glass-button"
              onClick={() => {
                localStorage.removeItem("currentUserId");
                navigate("/");
              }}
            >
              <LogOut size={20} />
            </Button>
          </div>

          <div className="flex gap-4">
            <Input
              placeholder="Enter friend's ID (e.g., 1, 2, 3)"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
              className="glass-effect"
            />
            <Button onClick={handleAddFriend} className="glass-button">
              <UserPlus size={20} className="mr-2" />
              Add Friend
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.chatId}
              className="glass-card hover:bg-white/20 cursor-pointer transition-all duration-200"
              onClick={() => navigate(`/chat/${chat.chatId}`)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <User size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">
                    User {chat.user1_ID === parseInt(currentUserId || "0")
                      ? chat.user2_ID
                      : chat.user1_ID}
                  </h3>
                  <p className="text-sm text-white/70">Click to view chat</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;