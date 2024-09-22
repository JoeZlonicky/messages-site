import { sendMessage } from '../api/calls/sendMessage';
import { Message } from '../types/Message';
import { FormEvent, useState } from 'react';

type SendMessageBoxProps = {
  toUserId: number;
  addSentMessage: (message: Message) => void;
};

function SendMessageBox({ toUserId, addSentMessage }: SendMessageBoxProps) {
  const [message, setMessage] = useState('');

  async function attemptSendMessage(event: FormEvent) {
    event.preventDefault();

    const result = await sendMessage(toUserId, message);

    if (result.success && result.message) {
      addSentMessage(result.message);
      setMessage('');
    }
  }

  return (
    <form
      onSubmit={(event: FormEvent) => {
        void attemptSendMessage(event);
      }}
    >
      <div className="my-2 flex gap-2">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="input input-bordered w-full"
          placeholder="Message..."
        ></input>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </div>
    </form>
  );
}

export { SendMessageBox };
