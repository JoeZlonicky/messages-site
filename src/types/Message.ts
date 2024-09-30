import { User } from './User';

type Message = {
  fromUser: User;
  toUser?: User;

  id: number;
  content: string;
  createdAt: string;
};

export type { Message };
