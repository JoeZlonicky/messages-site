import { logOut } from '../api/calls/logOut';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';

type ServerPanelProps = {
  user: User;
  allUsers: User[];
  roomId: number;
  setRoomId: (id: number) => void;
};

function ServerPanel({ user, allUsers, roomId, setRoomId }: ServerPanelProps) {
  const navigate = useNavigate();

  async function attemptLogOut() {
    const success = await logOut();
    if (success) {
      navigate('/login');
    }
  }

  return (
    <div className="relative flex h-screen min-w-56 flex-col border-r-2 border-r-accent bg-base-300 shadow-lg">
      <div className="flex flex-1 flex-col gap-2 overflow-auto p-4 pb-32">
        <div
          onClick={() => setRoomId(-1)}
          className={
            'btn btn-outline btn-accent' + (roomId === -1 ? ' btn-active' : '')
          }
        >
          Server
        </div>
        <hr className="my-2 border-accent" />
        {allUsers.map((otherUser) => {
          if (user.id === otherUser.id) return undefined;
          return (
            <div
              key={otherUser.id}
              onClick={() => setRoomId(otherUser.id)}
              className={
                'btn btn-outline btn-accent' +
                (roomId === otherUser.id ? ' btn-active' : '')
              }
            >
              {otherUser.displayName}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 border-t-2 border-accent bg-base-300 p-2">
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
