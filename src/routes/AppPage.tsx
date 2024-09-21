import { NoAuthError } from '../api/NoAuthError';
import { getServerMessages } from '../api/calls/getServerMessages';
import { getSessionUser } from '../api/calls/getSessionUser';
import { getUsers } from '../api/calls/getUsers';
import { ServerPanel } from '../components/ServerPanel';
import { useUser } from '../hooks/useUser';
import { Message } from '../types/Message';
import { User } from '../types/User';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AppPage() {
  const {
    userState: { user },
    userDispatch,
  } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [serverMessages, setServerMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

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

    const fetchUserIfNeeded = async () => {
      if (user) return;

      const sessionUserQuery = await getSessionUser();
      if (sessionUserQuery.success && sessionUserQuery.user) {
        userDispatch({ type: 'logIn', user: sessionUserQuery.user });
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([
          fetchUserIfNeeded(),
          fetchUsers(),
          fetchServerMessages(),
        ]);
      } catch (error) {
        if (error instanceof NoAuthError) {
          navigate('/login');
          return;
        }
        throw error;
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <div className="flex gap-8">
      <ServerPanel user={user!} allUsers={users} />

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
