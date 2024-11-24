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
  getNotifications,
  Chat,
  Notification 
} from "@/lib/api";

const Chats = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [friendId, setFriendId] = useState("");
  const currentUserId = localStorage.getItem("currentUserId");

  useEffect(() => {
    if (!currentUserId) {
      navigate("/");
      return;
    }
    
    const fetchData = async () => {
      const chatsData = await getChats(parseInt(currentUserId));
      const notificationsData = await getNotifications(parseInt(currentUserId));
      setChats(chatsData);
      setNotifications(notificationsData);
    };

    fetchData();
  }, [currentUserId, navigate]);

  const handleAddFriend = async () => {
    if (!friendId || !currentUserId) return;
    const newChat = await inviteFriend(parseInt(currentUserId), parseInt(friendId));
    if (newChat) {
      setFriendId("");
      // Refresh notifications after sending invite
      const notificationsData = await getNotifications(parseInt(currentUserId));
      setNotifications(notificationsData);
    }
  };

  const handleAcceptFriend = async (friendId: number) => {
    if (!currentUserId) return;
    await acceptFriend(parseInt(currentUserId), friendId);
    // Refresh both chats and notifications
    const [chatsData, notificationsData] = await Promise.all([
      getChats(parseInt(currentUserId)),
      getNotifications(parseInt(currentUserId))
    ]);
    setChats(chatsData);
    setNotifications(notificationsData);
  };

  const handleDeclineFriend = async (friendId: number) => {
    if (!currentUserId) return;
    await declineFriend(parseInt(currentUserId), friendId);
    // Refresh notifications after declining
    const notificationsData = await getNotifications(parseInt(currentUserId));
    setNotifications(notificationsData);
  };

  const handleBlockFriend = async (friendId: number) => {
    if (!currentUserId) return;
    await blockFriend(parseInt(currentUserId), friendId);
    const chatsData = await getChats(parseInt(currentUserId));
    setChats(chatsData);
  };

  const handleUnblockFriend = async (friendId: number) => {
    if (!currentUserId) return;
    await unblockFriend(parseInt(currentUserId), friendId);
    const chatsData = await getChats(parseInt(currentUserId));
    setChats(chatsData);
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
                <p className="text-sm text-white/70">User {currentUserId}</p>
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

        {/* Friend Requests Section */}
        {notifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-white/90">Friend Requests</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="glass-card p-4 border-l-4 border-yellow-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <User size={24} className="text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">User {notification.user_id}</h3>
                        <p className="text-sm text-white/70">Friend Request</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAcceptFriend(notification.user_id)}
                        className="glass-button bg-green-500/20 hover:bg-green-500/30"
                      >
                        <Check size={16} className="mr-1" />
                        Accept
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeclineFriend(notification.user_id)}
                        className="glass-button bg-red-500/20 hover:bg-red-500/30"
                      >
                        <X size={16} className="mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Chats Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white/90">Active Chats</h2>
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
                    <div 
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => navigate(`/chat/${chat.chatId}`)}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <User size={24} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">User {friendUserId}</h3>
                        <p className="text-sm text-white/70">ID: {friendUserId}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
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
    </div>
  );
};

export default Chats;