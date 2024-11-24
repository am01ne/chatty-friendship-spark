import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, UserPlus, LogOut, Shield, ShieldOff, Check, X } from "lucide-react";
import { 
  inviteFriend, 
  getChats, 
  acceptFriend, 
  declineFriend, 
  blockFriend, 
  unblockFriend,
  Chat 
} from "@/lib/api";

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

  const handleAcceptFriend = async (friendId: number) => {
    if (!currentUserId) return;
    await acceptFriend(parseInt(currentUserId), friendId);
    // Refresh chats after accepting
    const updatedChats = await getChats(parseInt(currentUserId));
    setChats(updatedChats);
  };

  const handleDeclineFriend = async (friendId: number) => {
    if (!currentUserId) return;
    await declineFriend(parseInt(currentUserId), friendId);
    // Remove declined chat from list
    setChats(chats.filter(chat => 
      !(chat.user1_ID === friendId || chat.user2_ID === friendId)
    ));
  };

  const handleBlockFriend = async (friendId: number) => {
    if (!currentUserId) return;
    await blockFriend(parseInt(currentUserId), friendId);
    // Refresh chats after blocking
    const updatedChats = await getChats(parseInt(currentUserId));
    setChats(updatedChats);
  };

  const handleUnblockFriend = async (friendId: number) => {
    if (!currentUserId) return;
    await unblockFriend(parseInt(currentUserId), friendId);
    // Refresh chats after unblocking
    const updatedChats = await getChats(parseInt(currentUserId));
    setChats(updatedChats);
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
          {chats.map((chat) => {
            const friendUserId = chat.user1_ID === parseInt(currentUserId || "0")
              ? chat.user2_ID
              : chat.user1_ID;

            return (
              <div
                key={chat.chatId}
                className="glass-card p-4 hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 cursor-pointer"
                       onClick={() => navigate(`/chat/${chat.chatId}`)}>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <User size={24} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">User {friendUserId}</h3>
                      <p className="text-sm text-white/70">Click to view chat</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAcceptFriend(friendUserId)}
                      className="glass-button"
                    >
                      <Check size={16} className="mr-1" />
                      Accept
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeclineFriend(friendUserId)}
                      className="glass-button"
                    >
                      <X size={16} className="mr-1" />
                      Decline
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBlockFriend(friendUserId)}
                      className="glass-button"
                    >
                      <Shield size={16} className="mr-1" />
                      Block
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUnblockFriend(friendUserId)}
                      className="glass-button"
                    >
                      <ShieldOff size={16} className="mr-1" />
                      Unblock
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chats;