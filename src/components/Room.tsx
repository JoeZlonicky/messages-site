import { Message } from '../types/Message';
import { User } from '../types/User';
import { SendMessageBox } from './SendMessageBox';
import { useCallback, useEffect, useState } from 'react';

type RoomProps = {
  roomId: number;
  user: User;
  allUsers: User[];
  messagesInRoom: Map<number, Message[]>;
  updateMessagesInRoom: (roomId: number, userId: number) => Promise<void>;
  addMessageToRoom: (roomId: number, newMessage: Message) => void;
};

function Room({
  roomId,
  user,
  allUsers,
  messagesInRoom,
  updateMessagesInRoom,
  addMessageToRoom,
}: RoomProps) {
  const getToUser = useCallback(() => {
    const found = allUsers.find((otherUser) => otherUser.id === roomId);
    return found;
  }, [roomId]);

  useEffect(() => {
    void updateMessagesInRoom(roomId, user.id);
  }, [roomId, user]);

  const messages = messagesInRoom.get(roomId);

  const messagesContent = !messages ? (
    <div className="flex flex-1 flex-col justify-end p-4 pb-0 italic">
      Loading...
    </div>
  ) : messages.length === 0 ? (
    <div className="flex flex-1 flex-col justify-end p-4 pb-0 italic">
      No messages yet
    </div>
  ) : (
    <div className="flex flex-1 flex-col justify-end p-4 pb-0">
      {messages.map((message) => {
        return (
          <div key={message.id}>
            {message.fromUser.displayName} - {message.content}
          </div>
        );
      })}
    </div>
  );

  let icon =
    roomId === -1 ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        className="inline-block h-8 w-8"
      >
        <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="inline-block h-8 w-8"
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
      </svg>
    );
  let roomName = roomId === -1 ? 'Server' : getToUser()?.displayName;

  return (
    <div className="flex flex-1 flex-col">
      <h2 className="flex items-center gap-4 bg-accent p-4 text-3xl text-accent-content shadow-lg">
        {icon}
        {roomName}
      </h2>
      {messagesContent}
      <SendMessageBox
        toUserId={roomId}
        addSentMessage={(message) => addMessageToRoom(roomId, message)}
      />
    </div>
  );
}

export { Room };
