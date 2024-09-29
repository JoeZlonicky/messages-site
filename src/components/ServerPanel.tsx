import { logOut } from '../api/calls/logOut';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';

type ServerPanelProps = {
  user: User;
  allUsers: User[];
  setRoomId: (id: number) => void;
};

function ServerPanel({ user, allUsers, setRoomId }: ServerPanelProps) {
  const navigate = useNavigate();

  async function attemptLogOut() {
    const success = await logOut();
    if (success) {
      navigate('/login');
    }
  }

  return (
    <div className="relative h-screen min-w-56 bg-base-300 pl-4 pr-8 pt-4 shadow-lg">
      <h2 className="text-3xl">Server</h2>
      <div onClick={() => setRoomId(-1)} className="link">
        Server
      </div>

      <h2 className="mt-4 text-3xl">Users</h2>
      <div>
        {allUsers.map((otherUser) => {
          if (user.id === otherUser.id) return undefined;
          return (
            <div
              key={otherUser.id}
              onClick={() => setRoomId(otherUser.id)}
              className="link"
            >
              {otherUser.displayName}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 mx-auto box-border flex flex-col gap-2 bg-base-300 p-4">
        <div className="text-center text-accent">{user.displayName}</div>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => void attemptLogOut()}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export { ServerPanel };
