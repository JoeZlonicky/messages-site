import { Message } from '../../types/Message';
import { api } from '../api';
import { throwIfNoAuth } from '../throwIfNoAuth';

type GetServerMessagesResult = {
  success: boolean;
  messages?: Message[];
};

async function getServerMessages(): Promise<GetServerMessagesResult> {
  try {
    const response = await api.get('/messages?toUserId=-1');
    const messages = response.data as Message[];
    return { success: true, messages };
  } catch (error) {
    throwIfNoAuth(error);
    return { success: false };
  }
}

export { getServerMessages };
