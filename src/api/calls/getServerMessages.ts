import { GetMessagesResult } from '../../types/GetMessagesResult';
import { Message } from '../../types/Message';
import { api } from '../api';
import { redirectIfNoAuth } from '../redirectIfNoAuth';

async function getServerMessages(): Promise<GetMessagesResult> {
  try {
    const response = await api.get('/messages?toUserId=-1');
    const messages = response.data as Message[];
    return { success: true, messages };
  } catch (error) {
    redirectIfNoAuth(error);
    return { success: false };
  }
}

export { getServerMessages };
