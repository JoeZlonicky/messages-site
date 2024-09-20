import { User } from './User';

type Message = {
  fromUser: User;
  toUser?: User;

  id: number;
  content: string;
  createdAt: Date;
};

export type { Message };
