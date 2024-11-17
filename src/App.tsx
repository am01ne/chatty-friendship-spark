import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chats from "./pages/Chats";
import ChatDetail from "./pages/ChatDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:chatId" element={<ChatDetail />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;