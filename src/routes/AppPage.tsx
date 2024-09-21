import { getSessionUser } from '../api/calls/getSessionUser';
import { getAllUsers } from '../api/calls/getUsers';
import { Room } from '../components/Room';
import { ServerPanel } from '../components/ServerPanel';
import { useUser } from '../hooks/useUser';
import { User } from '../types/User';
import { useEffect, useState } from 'react';

function AppPage() {
  const {
    userState: { user },
    userDispatch,
  } = useUser();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [roomId, setRoomId] = useState(-1);
  const [loadingStatus, setLoadingStatus] = useState('Loading...');

  useEffect(() => {
    const fetchUserIfNeeded = async () => {
      if (user) {
        return;
      }

      setLoadingStatus('Loading...');
      const result = await getSessionUser();
      if (result.success && result.user) {
        userDispatch({ type: 'logIn', user: result.user });
      } else {
        setLoadingStatus('Failed to load.');
      }
    };

    const fetchAllUsers = async () => {
      const result = await getAllUsers();
      if (result.success && result.users) {
        setAllUsers(result.users);
      }
    };

    fetchUserIfNeeded();
    fetchAllUsers();
  }, []);

  if (!user) {
    return <>{loadingStatus}</>;
  }

  return (
    <div className="flex gap-8">
      <ServerPanel user={user} allUsers={allUsers} setRoomId={setRoomId} />
      <Room roomId={roomId} user={user} allUsers={allUsers} />
    </div>
  );
}

export { AppPage };
