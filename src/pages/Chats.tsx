import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatList from "@/components/ChatList";
import { addFriend, getChats, Chat } from "@/lib/api";

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
    const newChat = await addFriend(parseInt(currentUserId), parseInt(friendId));
    if (newChat) {
      setChats([...chats, newChat]);
      setFriendId("");
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Your Chats</h1>
          <div className="text-sm text-gray-500">
            Your ID: {currentUserId}
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("currentUserId");
              navigate("/");
            }}
          >
            Switch Profile
          </Button>
        </div>

        <div className="flex gap-4 mb-8">
          <Input
            placeholder="Enter friend's ID (e.g., 1, 2, 3)"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
          />
          <Button onClick={handleAddFriend}>Add Friend</Button>
        </div>

        <ChatList chats={chats} currentUserId={parseInt(currentUserId || "0")} />
      </div>
    </div>
  );
};

export default Chats;