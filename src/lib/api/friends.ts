import { toast } from "@/components/ui/use-toast";
import { API_URL, getAuthHeaders, handleApiError } from "./config";

export const inviteFriend = async (user1Id: number, user2Id: number) => {
  try {
    console.log(`Sending friend request: user1=${user1Id}, user2=${user2Id}`);
    const response = await fetch(`${API_URL}/invite/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        user1: user1Id.toString(),
        user2: user2Id.toString(),
        type: "friend",
      }),
    });
    
    if (!response.ok) throw new Error("Failed to send friend request");
    
    const data = await response.json();
    console.log("Friend request response:", data);
    
    toast({
      title: "Success",
      description: "Friend request sent successfully!",
    });
    return data;
  } catch (error) {
    handleApiError(error, "Error sending friend request");
  }
};

export const acceptFriend = async (user2Id: number) => {
  try {
    console.log(`Accepting friend request from user: ${user2Id}`);
    const response = await fetch(`${API_URL}/accept/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        user2: user2Id.toString(),
        type: "friend",
      }),
    });
    
    if (!response.ok) throw new Error("Failed to accept friend request");
    
    const data = await response.json();
    console.log("Accept friend response:", data);
    
    toast({
      title: "Success",
      description: "Friend request accepted!",
    });
    return data;
  } catch (error) {
    handleApiError(error, "Error accepting friend request");
  }
};

export const declineFriend = async (user2Id: number) => {
  try {
    console.log(`Declining friend request from user: ${user2Id}`);
    const response = await fetch(`${API_URL}/decline/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        user2: user2Id.toString(),
        type: "friend",
      }),
    });
    
    if (!response.ok) throw new Error("Failed to decline friend request");
    
    const data = await response.json();
    console.log("Decline friend response:", data);
    
    toast({
      title: "Success",
      description: "Friend request declined",
    });
    return data;
  } catch (error) {
    handleApiError(error, "Error declining friend request");
  }
};

export const blockFriend = async (user1Id: number, user2Id: number) => {
  try {
    console.log(`Blocking user: ${user2Id}`);
    const response = await fetch(`${API_URL}/blockFriend/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        user2: user2Id.toString(),
        type: "friend",
      }),
    });
    
    if (!response.ok) throw new Error("Failed to block user");
    
    const data = await response.json();
    console.log("Block friend response:", data);
    
    toast({
      title: "Success",
      description: "User blocked successfully",
    });
    return data;
  } catch (error) {
    handleApiError(error, "Error blocking user");
  }
};

export const unblockFriend = async (user1Id: number, user2Id: number) => {
  try {
    console.log(`Unblocking user: ${user2Id}`);
    const response = await fetch(`${API_URL}/deblockFriend/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        user2: user2Id.toString(),
        type: "friend",
      }),
    });
    
    if (!response.ok) throw new Error("Failed to unblock user");
    
    const data = await response.json();
    console.log("Unblock friend response:", data);
    
    toast({
      title: "Success",
      description: "User unblocked successfully",
    });
    return data;
  } catch (error) {
    handleApiError(error, "Error unblocking user");
  }
};