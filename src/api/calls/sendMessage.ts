import { Message } from '../../types/Message';
import { api } from '../api';
import { redirectIfNoAuth } from '../redirectIfNoAuth';

type SendMessageResult = {
  success: boolean;
  message?: Message;
};

// toUserId of -1 means to server
async function sendMessage(
  toUserId: number,
  content: string,
): Promise<SendMessageResult> {
  try {
    const response = await api.post('/messages', { toUserId, content });
    const message = response.data as Message;
    return { success: true, message };
  } catch (error) {
    redirectIfNoAuth(error);
    return { success: false };
  }
}

export { sendMessage };
