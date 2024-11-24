import { Button } from "@/components/ui/button";
import { User, Check, X } from "lucide-react";
import { Notification } from "@/lib/api";

interface FriendRequestsProps {
  notifications: Notification[];
  onAccept: (friendId: number) => void;
  onDecline: (friendId: number) => void;
}

const FriendRequests = ({ notifications, onAccept, onDecline }: FriendRequestsProps) => {
  if (!notifications.length) return null;

  return (
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
                  onClick={() => onAccept(notification.user_id)}
                  className="glass-button bg-green-500/20 hover:bg-green-500/30"
                >
                  <Check size={16} className="mr-1" />
                  Accept
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDecline(notification.user_id)}
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
  );
};

export default FriendRequests;