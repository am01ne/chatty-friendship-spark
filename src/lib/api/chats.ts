import { toast } from "@/components/ui/use-toast";
import { API_URL, getAuthHeaders } from "./config";
import { Chat, Message } from "./types";

export const getChats = async (): Promise<Chat[]> => {
  try {
    console.log("Fetching chats using JWT token");
    const response = await fetch(`${API_URL}/getChats/`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) throw new Error("Failed to fetch chats");
    
    const data = await response.json();
    console.log("Received chats data:", data);
    return data;
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

export const getMessages = async (friendshipId: number): Promise<Message[]> => {
  try {
    console.log("Fetching messages for friendship_id:", friendshipId);
    const response = await fetch(`${API_URL}/getMessages/${friendshipId}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) throw new Error("Failed to fetch messages");
    
    const data = await response.json();
    console.log("Received messages data:", data);
    return data;
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