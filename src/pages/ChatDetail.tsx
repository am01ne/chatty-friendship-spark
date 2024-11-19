import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "@/components/MessageBubble";
import { getMessages, Message } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import ReconnectingWebSocket from "reconnecting-websocket";

const ChatDetail = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<ReconnectingWebSocket | null>(null);
  const currentUserId = localStorage.getItem("currentUserId");
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUserId) {
      navigate("/");
      return;
    }

    // Initial messages load
    const fetchMessages = async () => {
      if (!chatId) return;
      const data = await getMessages(parseInt(chatId));
      setMessages(data);
    };

    fetchMessages();

    // WebSocket connection
    const ws = new ReconnectingWebSocket(
      `ws://localhost:8000/ws/chat/${chatId}/${currentUserId}/`
    );

    ws.onopen = () => {
      console.log("WebSocket Connected");
      toast({
        title: "Connected to chat",
        description: "You can now send and receive messages",
      });
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      const data = JSON.parse(event.data);
      if (data.message) {
        const newMsg: Message = {
          chatId: parseInt(chatId!),
          senderId: parseInt(data.message.senderId),
          msg: data.message.msg,
          sent_at: new Date().toISOString(),
        };
        console.log("Adding new message to state:", newMsg);
        setMessages((prevMessages) => [...prevMessages, newMsg]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      toast({
        title: "Disconnected from chat",
        description: "Attempting to reconnect...",
        variant: "destructive",
      });
    };

    wsRef.current = ws;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [chatId, currentUserId, navigate, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chatId || !currentUserId || !wsRef.current) return;

    const messageData = {
      message: {
        senderId: currentUserId,
        msg: newMessage,
        chatId: chatId,
      },
    };

    console.log("Sending message:", messageData);
    wsRef.current.send(JSON.stringify(messageData));
    setNewMessage("");
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/chats")}>
            Back to Chats
          </Button>
          <h1 className="text-2xl font-bold">Chat</h1>
          <div className="w-[100px]" />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="h-[500px] overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                isCurrentUser={message.senderId === parseInt(currentUserId || "0")}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-4">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;