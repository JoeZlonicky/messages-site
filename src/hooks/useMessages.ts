import { getDirectMessages } from '../api/calls/getDirectMessages';
import { getServerMessages } from '../api/calls/getServerMessages';
import { GetMessagesResult } from '../types/GetMessagesResult';
import { Message } from '../types/Message';
import { useState } from 'react';
import { io } from 'socket.io-client';

const fetchMessages = async (roomId: number, userId: number) => {
  let result: GetMessagesResult;
  if (roomId === -1) {
    result = await getServerMessages();
  } else {
    result = await getDirectMessages(userId, roomId);
  }
  return result?.messages;
};

const defaultMessagesInRoom = new Map<number, Message[]>();

function useMessages(): [
  Map<number, Message[]>,
  (roomId: number, userId: number) => Promise<void>,
  (roomId: number, newMessage: Message) => void,
] {
  const [messagesInRoom, setMessagesInRoom] = useState(defaultMessagesInRoom);
  const initializedRooms = new Map<number, boolean>();

  const socket = io(import.meta.env.VITE_MESSAGES_API_URL, {
    withCredentials: true,
  });

  socket.on('message', (message: Message) => {
    const roomId = message.toUser?.id || -1;
    addMessageToRoom(roomId, message);
  });

  function addMessageToRoom(roomId: number, message: Message) {
    setMessagesInRoom((map) => {
      const messages = map.get(roomId) || [];
      if (messages.find((msg) => msg.id === message.id)) {
        return map;
      }
      return new Map(
        map.set(roomId, (map.get(roomId) || []).concat([message])),
      );
    });
  }

  async function updateMessagesInRoom(roomId: number, userId: number) {
    if (initializedRooms.get(roomId)) {
      return;
    }

    const existingMessages = await fetchMessages(roomId, userId);
    if (!initializedRooms.get(roomId) && existingMessages) {
      setMessagesInRoom(new Map(messagesInRoom.set(roomId, existingMessages)));
      initializedRooms.set(roomId, true);
    }
  }

  return [messagesInRoom, updateMessagesInRoom, addMessageToRoom];
}

export { useMessages };
