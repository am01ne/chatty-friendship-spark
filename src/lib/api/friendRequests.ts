import { toast } from "@/components/ui/use-toast";

const API_URL = "http://localhost:8000";

export const acceptFriend = async (user1Id: number, user2Id: number) => {
  try {
    console.log(`Accepting friend request: user1=${user1Id}, user2=${user2Id}`);
    const response = await fetch(`${API_URL}/acceptFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user1: user1Id.toString(),
        user2: user2Id.toString(),
        type: "friend",
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Server error:", errorData);
      throw new Error("Failed to accept friend request");
    }
    
    const result = await response.json();
    console.log("Accept friend response:", result);
    
    toast({
      title: "Success",
      description: "Friend request accepted!",
    });
    return result;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    toast({
      title: "Error",
      description: "Failed to accept friend request",
      variant: "destructive",
    });
    throw error;
  }
};

export const declineFriend = async (user1Id: number, user2Id: number) => {
  try {
    console.log(`Declining friend request: user1=${user1Id}, user2=${user2Id}`);
    const response = await fetch(`${API_URL}/declineFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user1: user1Id.toString(),
        user2: user2Id.toString(),
        type: "friend",
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Server error:", errorData);
      throw new Error("Failed to decline friend request");
    }
    
    const result = await response.json();
    console.log("Decline friend response:", result);
    
    toast({
      title: "Success",
      description: "Friend request declined",
    });
    return result;
  } catch (error) {
    console.error("Error declining friend request:", error);
    toast({
      title: "Error",
      description: "Failed to decline friend request",
      variant: "destructive",
    });
    throw error;
  }
};