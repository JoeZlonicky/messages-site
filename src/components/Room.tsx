import { useMessages } from '../hooks/useMessages';
import { User } from '../types/User';
import { MessageElement } from './MessageElement';
import { SendMessageBox } from './SendMessageBox';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createRef, useCallback, useEffect, useState } from 'react';

type RoomProps = {
  roomId: number;
  user: User;
  allUsers: User[];
};

function Room({ roomId, user, allUsers }: RoomProps) {
  const getToUser = useCallback(() => {
    const found = allUsers.find((otherUser) => otherUser.id === roomId);
    return found;
  }, [allUsers, roomId]);

  const [messages, addMessage] = useMessages(user.id, roomId);
  const messagesContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!messagesContainer.current) {
      return;
    }

    messagesContainer.current.scrollTop =
      messagesContainer.current.scrollHeight;
  }, [messages]);

  const messagesContent = !messages ? (
    <div className="flex flex-1 flex-col p-4 pb-0 italic">Loading...</div>
  ) : messages.length === 0 ? (
    <div className="flex flex-1 flex-col p-4 pb-0 italic">No messages yet</div>
  ) : (
    <div
      className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pb-4"
      ref={messagesContainer}
    >
      {messages.map((message) => {
        return (
          <MessageElement
            message={message}
            isBySelf={message.fromUser.id === user.id}
            key={message.id}
          />
        );
      })}
    </div>
  );

  let icon =
    roomId === -1 ? (
      <FontAwesomeIcon icon={faUsers} />
    ) : (
      <FontAwesomeIcon icon={faUser} />
    );
  let roomName = roomId === -1 ? 'Server' : getToUser()?.displayName;

  return (
    <div className="flex h-screen flex-1 flex-col">
      <h2 className="flex items-center gap-4 bg-accent p-4 text-3xl text-accent-content shadow-lg">
        {icon}
        {roomName}
      </h2>
      {messagesContent}
      <SendMessageBox
        toUserId={roomId}
        addSentMessage={(message) => addMessage(message)}
      />
    </div>
  );
}

export { Room };
