import { User } from '../types/User';

type ServerPanelProps = {
  user: User;
  allUsers: User[];
};

function ServerPanel({ user, allUsers }: ServerPanelProps) {
  return (
    <div>
      <h2 className="text-3xl">Users</h2>
      <div>
        {allUsers.map((otherUser) => {
          if (user.id === otherUser.id) return undefined;
          return <div key={otherUser.id}>{otherUser.displayName}</div>;
        })}
      </div>
      <div>Logged in: {user.displayName}</div>
    </div>
  );
}

export { ServerPanel };
