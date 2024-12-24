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