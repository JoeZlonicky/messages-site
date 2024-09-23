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
  if (!messages) {
    return <>Loading messages...</>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl">
        {roomId === -1
          ? 'Server Messages'
          : `Messages with ${getToUser()?.displayName}`}
      </h2>
      {messages.length == 0 ? (
        <div>No messages!</div>
      ) : (
        <div>
          {messages.map((message) => {
            return (
              <div key={message.id}>
                {message.fromUser.displayName} - {message.content}
              </div>
            );
          })}
        </div>
      )}
      <SendMessageBox
        toUserId={roomId}
        addSentMessage={(message) => addMessageToRoom(roomId, message)}
      />
    </div>
  );
}

export { Room };
