import { getDirectMessages } from '../api/calls/getDirectMessages';
import { getServerMessages } from '../api/calls/getServerMessages';
import { GetMessagesResult } from '../types/GetMessagesResult';
import { Message } from '../types/Message';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const fetchMessages = async (userId: number, roomId: number) => {
  let result: GetMessagesResult;
  if (roomId === -1) {
    result = await getServerMessages();
  } else {
    result = await getDirectMessages(userId, roomId);
  }
  return result?.messages || [];
};

function useMessages(
  userId: number,
  roomId: number,
): [messages: Message[], addMessage: (message: Message) => void] {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>();

  async function refresh() {
    setMessages([]);
    const fetchedMessages = await fetchMessages(userId, roomId);
    setMessages((prev) => {
      const earlierMessages = fetchedMessages.filter(
        (msg) => !prev.find((prevMsg) => prevMsg.id === msg.id),
      );
      return earlierMessages.concat(prev);
    });
  }

  useEffect(() => {
    if (socket) {
      socket.disconnect();
    }
    const newSocket = io(import.meta.env.VITE_MESSAGES_API_URL, {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      void refresh();
    });

    newSocket.on('message', (message: Message) => {
      const to = message.toUser?.id || -1;
      if (to !== roomId) return;
      addMessage(message);
    });

    setSocket(newSocket);
  }, [userId, roomId]);

  function addMessage(message: Message) {
    setMessages((prev) => {
      if (prev.find((msg) => msg.id === message.id)) {
        return prev;
      }
      return prev.concat([message]);
    });
  }

  return [messages, addMessage];
}

export { useMessages };
