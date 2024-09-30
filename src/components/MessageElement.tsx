import { Message } from '../types/Message';
import { formatRelative } from 'date-fns';

type MessageElementProps = {
  message: Message;
  isBySelf: boolean;
};

function MessageElement(props: MessageElementProps) {
  return (
    <div className="bg-neutral p-2">
      <div>
        <b>{props.message.fromUser.displayName}</b> -{' '}
        <i>{formatRelative(props.message.createdAt, new Date())}</i>
      </div>
      <div>{props.message.content}</div>
    </div>
  );
}

export { MessageElement };
