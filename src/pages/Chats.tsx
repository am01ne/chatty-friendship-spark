import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, UserPlus, LogOut } from "lucide-react";
import { 
  inviteFriend, 
  getChats, 
  acceptFriend, 
  declineFriend, 
  getNotifications,
  Chat,
  Notification 
} from "@/lib/api";
import ChatList from "@/components/ChatList";
import FriendRequests from "@/components/FriendRequests";

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
      const [chatsData, notificationsData] = await Promise.all([
        getChats(parseInt(currentUserId)),
        getNotifications(parseInt(currentUserId))
      ]);
      console.log("Fetched chats:", chatsData);
      console.log("Fetched notifications:", notificationsData);
      setChats(chatsData);
      setNotifications(notificationsData);
    };

    fetchData();
  }, [currentUserId, navigate]);

  const handleAddFriend = async () => {
    if (!friendId || !currentUserId) return;
    await inviteFriend(parseInt(currentUserId), parseInt(friendId));
    setFriendId("");
    // Refresh notifications after sending invite
    const notificationsData = await getNotifications(parseInt(currentUserId));
    setNotifications(notificationsData);
  };

  const handleAcceptFriend = async (friendId: number) => {
    if (!currentUserId) return;
    console.log("Accepting friend request from:", friendId);
    const result = await acceptFriend(parseInt(currentUserId), friendId);
    console.log("Accept friend result:", result);
    
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
    console.log("Declining friend request from:", friendId);
    const result = await declineFriend(parseInt(currentUserId), friendId);
    console.log("Decline friend result:", result);
    
    // Refresh notifications after declining
    const notificationsData = await getNotifications(parseInt(currentUserId));
    setNotifications(notificationsData);
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

        <FriendRequests 
          notifications={notifications}
          onAccept={handleAcceptFriend}
          onDecline={handleDeclineFriend}
        />

        <div>
          <h2 className="text-lg font-semibold mb-4 text-white/90">Active Chats</h2>
          <ChatList chats={chats} currentUserId={parseInt(currentUserId || "0")} />
        </div>
      </div>
    </div>
  );
};

export default Chats;