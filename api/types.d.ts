export interface Message {
  id: string;
  datetime: string;
  message: string;
  author: string;
}

export type MessageBody = Omit<Message, 'id', 'datetime'>