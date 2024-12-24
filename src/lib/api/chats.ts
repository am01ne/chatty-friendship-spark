import { toast } from "@/components/ui/use-toast";
import { API_URL, getAuthHeaders, handleApiError } from "./config";
import { Chat } from "./types";

export const getChats = async (userId: number): Promise<Chat[]> => {
  try {
    console.log("Fetching chats for user:", userId);
    const response = await fetch(`${API_URL}/getChats/${userId}`, {
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

export const getMessages = async (chatId: number) => {
  try {
    console.log("Fetching messages for chat:", chatId);
    const response = await fetch(`${API_URL}/getMessages/${chatId}`, {
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