import { GetMessagesResult } from '../../types/GetMessagesResult';
import { Message } from '../../types/Message';
import { api } from '../api';
import { redirectIfNoAuth } from '../redirectIfNoAuth';

async function getDirectMessages(
  userId: number,
  otherUserId: number,
): Promise<GetMessagesResult> {
  try {
    const response = await api.get(
      `/messages?fromUserId=${userId}&toUserId=${userId}&fromUserId=${otherUserId}&toUserId=${otherUserId}`,
    );
    const messages = response.data as Message[];
    return { success: true, messages };
  } catch (error) {
    redirectIfNoAuth(error);
    return { success: false };
  }
}

export { getDirectMessages };
