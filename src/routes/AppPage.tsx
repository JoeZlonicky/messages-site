import { getServerMessages } from '../api/getServerMessages';
import { getUsers } from '../api/getUsers';
import { Message } from '../types/Message';
import { User } from '../types/User';
import { useEffect, useState } from 'react';

function AppPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [serverMessages, setServerMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersQuery = await getUsers();
      if (usersQuery.success && usersQuery.users) {
        setUsers(usersQuery.users);
      }
    };

    const fetchServerMessages = async () => {
      const messagesQuery = await getServerMessages();
      if (messagesQuery.success && messagesQuery.messages) {
        setServerMessages(messagesQuery.messages);
      }
    };

    void fetchUsers();
    void fetchServerMessages();
  }, []);

  return (
    <div className="flex gap-8">
      <div>
        <h2 className="text-3xl">Users</h2>
        <div>
          {users.map((user) => {
            return <div key={user.id}>{user.displayName}</div>;
          })}
        </div>
      </div>

      <div>
        <h2 className="text-3xl">Messages</h2>
        <div>
          {serverMessages.map((message) => {
            return (
              <div key={message.id}>
                {message.fromUser.displayName} - {message.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { AppPage };
