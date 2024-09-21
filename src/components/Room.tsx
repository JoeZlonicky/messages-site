import { getDirectMessages } from '../api/calls/getDirectMessages';
import { getServerMessages } from '../api/calls/getServerMessages';
import { GetMessagesResult } from '../types/GetMessagesResult';
import { Message } from '../types/Message';
import { User } from '../types/User';
import { useCallback, useEffect, useState } from 'react';

type RoomProps = {
  roomId: number;
  user: User;
  allUsers: User[];
};

function Room({ roomId, user, allUsers }: RoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const getToUser = useCallback(() => {
    const found = allUsers.find((otherUser) => otherUser.id === roomId);
    return found;
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      let result: GetMessagesResult;
      if (roomId === -1) {
        result = await getServerMessages();
      } else {
        const toUser = getToUser();
        if (!toUser) {
          throw new Error('Corresponding user not found for room');
        }
        result = await getDirectMessages(user.id, toUser.id);
      }
      if (result.success && result.messages) {
        setMessages(result.messages);
      }
    };

    void fetchMessages();
  }, [roomId, user]);

  return (
    <div>
      <h2 className="text-3xl">Messages</h2>
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
    </div>
  );
}

export { Room };
