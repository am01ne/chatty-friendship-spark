import { toast } from "@/components/ui/use-toast";

const API_URL = "http://localhost:8000"; // Replace with your API URL

export interface Message {
  chatId: string;
  senderId: string;
  msg: string;
  sent_at: string;
}

export interface Chat {
  chatId: string;
  user1_ID: string;
  user2_ID: string;
}

export const addFriend = async (user1Id: string, user2Id: string) => {
  try {
    const response = await fetch(`${API_URL}/addFriend/${user1Id}/${user2Id}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to add friend");
    const data = await response.json();
    toast({
      title: "Success",
      description: "Friend added successfully!",
    });
    return data;
  } catch (error) {
    console.error("Error adding friend:", error);
    toast({
      title: "Error",
      description: "Failed to add friend",
      variant: "destructive",
    });
  }
};

export const getChats = async (userId: string) => {
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

export const sendMessage = async (chatId: string, senderId: string, message: string) => {
  try {
    const response = await fetch(`${API_URL}/addMsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        senderId,
        msg: message,
        sent_at: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error("Failed to send message");
    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    toast({
      title: "Error",
      description: "Failed to send message",
      variant: "destructive",
    });
  }
};

export const getMessages = async (chatId: string) => {
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