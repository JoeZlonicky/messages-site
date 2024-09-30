import { Message } from '../types/Message';
import { formatRelative } from 'date-fns';

type MessageElementProps = {
  message: Message;
  isBySelf: boolean;
};

function MessageElement(props: MessageElementProps) {
  let createdAtFormatted = formatRelative(props.message.createdAt, new Date());
  createdAtFormatted =
    createdAtFormatted.at(0)?.toUpperCase() + createdAtFormatted.slice(1);
  return (
    <div className="bg-neutral p-2">
      <div>
        <b>{props.message.fromUser.displayName}</b> -{' '}
        <i>{createdAtFormatted}</i>
      </div>
      <div>{props.message.content}</div>
    </div>
  );
}

export { MessageElement };
