import { Message } from './Message';

type GetMessagesResult = {
  success: boolean;
  messages?: Message[];
};

export type { GetMessagesResult };
