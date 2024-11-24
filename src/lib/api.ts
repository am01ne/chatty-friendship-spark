import { toast } from "@/components/ui/use-toast";

const API_URL = "http://localhost:8000";

export interface Message {
  chatId: number;
  senderId: number;
  msg: string;
  sent_at: string;
}

export interface Chat {
  chatId: number;
  user1_ID: number;
  user2_ID: number;
}

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  message: string;
  created_at: string;
  read: boolean;
}

export const getChats = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/getChats/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch chats");
    return await response.json();
  } catch (error) {
    console.error("Error fetching chats:", error);
    toast({
      title: "Error",
      description: "Failed to fetch chats",
      variant: "destructive",
    });
    return [];
  }
};

export const inviteFriend = async (user1Id: number, user2Id: number) => {
  try {
    const response = await fetch(`${API_URL}/inviteFriend/`, {
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
    if (!response.ok) throw new Error("Failed to send friend request");
    toast({
      title: "Success",
      description: "Friend request sent successfully!",
    });
    return await response.json();
  } catch (error) {
    console.error("Error sending friend request:", error);
    toast({
      title: "Error",
      description: "Failed to send friend request",
      variant: "destructive",
    });
  }
};

export const getMessages = async (chatId: number) => {
  try {
    const response = await fetch(`${API_URL}/getMessages/${chatId}`);
    if (!response.ok) throw new Error("Failed to fetch messages");
    return await response.json();
  } catch (error) {
    console.error("Error fetching messages:", error);
    toast({
      title: "Error",
      description: "Failed to fetch messages",
      variant: "destructive",
    });
    return [];
  }
};

export const getNotifications = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/getNotifications/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch notifications");
    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    toast({
      title: "Error",
      description: "Failed to fetch notifications",
      variant: "destructive",
    });
    return [];
  }
};

export const acceptFriend = async (user1Id: number, user2Id: number) => {
  try {
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
    if (!response.ok) throw new Error("Failed to accept friend request");
    toast({
      title: "Success",
      description: "Friend request accepted!",
    });
    return await response.json();
  } catch (error) {
    console.error("Error accepting friend request:", error);
    toast({
      title: "Error",
      description: "Failed to accept friend request",
      variant: "destructive",
    });
  }
};

export const declineFriend = async (user1Id: number, user2Id: number) => {
  try {
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
    if (!response.ok) throw new Error("Failed to decline friend request");
    toast({
      title: "Success",
      description: "Friend request declined",
    });
    return await response.json();
  } catch (error) {
    console.error("Error declining friend request:", error);
    toast({
      title: "Error",
      description: "Failed to decline friend request",
      variant: "destructive",
    });
  }
};

export const blockFriend = async (user1Id: number, user2Id: number) => {
  try {
    const response = await fetch(`${API_URL}/blockFriend/${user1Id}/${user2Id}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to block user");
    toast({
      title: "Success",
      description: "User blocked successfully",
    });
    return await response.json();
  } catch (error) {
    console.error("Error blocking user:", error);
    toast({
      title: "Error",
      description: "Failed to block user",
      variant: "destructive",
    });
  }
};

export const unblockFriend = async (user1Id: number, user2Id: number) => {
  try {
    const response = await fetch(`${API_URL}/deblockFriend/${user1Id}/${user2Id}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to unblock user");
    toast({
      title: "Success",
      description: "User unblocked successfully",
    });
    return await response.json();
  } catch (error) {
    console.error("Error unblocking user:", error);
    toast({
      title: "Error",
      description: "Failed to unblock user",
      variant: "destructive",
    });
  }
};