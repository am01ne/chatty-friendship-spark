import { toast } from "@/components/ui/use-toast";
import { API_URL, getAuthHeaders } from "./config";
import { Notification } from "./types";

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    console.log("Fetching notifications using JWT token");
    const response = await fetch(`${API_URL}/getNotifications/`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) throw new Error("Failed to fetch notifications");
    
    const data = await response.json();
    console.log("Received notifications data:", data);
    return data;
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