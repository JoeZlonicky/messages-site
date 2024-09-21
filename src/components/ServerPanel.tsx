import { User } from '../types/User';

type ServerPanelProps = {
  user: User;
  allUsers: User[];
  setRoomId: (id: number) => void;
};

function ServerPanel({ user, allUsers, setRoomId }: ServerPanelProps) {
  return (
    <div>
      <h2 className="text-3xl">Server</h2>
      <div onClick={() => setRoomId(-1)} className="link">
        Server
      </div>

      <h2 className="text-3xl">Users</h2>
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
      <h2 className="text-3xl">Logged in</h2>
      <div>{user.displayName}</div>
    </div>
  );
}

export { ServerPanel };
