import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "@/components/MessageBubble";
import { getMessages, sendMessage, Message } from "@/lib/api";

const ChatDetail = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = localStorage.getItem("currentUserId");

  useEffect(() => {
    if (!currentUserId) {
      navigate("/");
      return;
    }

    const fetchMessages = async () => {
      if (!chatId) return;
      const data = await getMessages(chatId);
      setMessages(data);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll for new messages

    return () => clearInterval(interval);
  }, [chatId, currentUserId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatId || !currentUserId) return;

    const sent = await sendMessage(chatId, currentUserId, newMessage);
    if (sent) {
      setMessages([...messages, sent]);
      setNewMessage("");
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/chats")}>
            Back to Chats
          </Button>
          <h1 className="text-2xl font-bold">Chat</h1>
          <div className="w-[100px]" /> {/* Spacer for centering */}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="h-[500px] overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                isCurrentUser={message.senderId === currentUserId}
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