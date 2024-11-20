import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "@/components/MessageBubble";
import { getMessages, Message } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import ReconnectingWebSocket from "reconnecting-websocket";
import { User, Send, ArrowLeft } from "lucide-react";

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
    <div className="container h-[calc(100vh-4rem)] py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        <div className="glass-card lg:col-span-3 overflow-y-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" className="glass-button p-2" onClick={() => navigate("/chats")}>
              <ArrowLeft size={20} />
            </Button>
            <h2 className="text-xl font-semibold">Chat Details</h2>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg glass-effect">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <User size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="font-medium">User {chatId}</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
        </div>

        <div className="glass-card lg:col-span-9 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                isCurrentUser={message.senderId === parseInt(currentUserId || "0")}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 pt-4 border-t border-white/10">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="glass-effect"
            />
            <Button onClick={handleSendMessage} className="glass-button">
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;