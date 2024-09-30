import { AxiosError } from 'axios';

function getBadRequestErrors(error: AxiosError) {
  const data = error?.response?.data;
  if (
    !(data instanceof Object) ||
    !('errors' in data) ||
    !Array.isArray(data.errors)
  ) {
    return null;
  }

  const messages = data.errors.filter((msg) => typeof msg === 'string');
  return messages.map((msg) => msg.at(0)?.toUpperCase() + msg.slice(1));
}

export { getBadRequestErrors };
