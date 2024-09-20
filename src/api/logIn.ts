import { api } from './api';
import { AxiosError } from 'axios';

type LogInResult = {
  success: boolean;
  message?: string;
};

function getBadRequestErrors(error: AxiosError) {
  const data = error?.response?.data;
  if (
    !(data instanceof Object) ||
    !('errors' in data) ||
    !Array.isArray(data.errors)
  ) {
    return null;
  }

  return data.errors.filter((msg) => typeof msg === 'string');
}

async function logIn(username: string, password: string): Promise<LogInResult> {
  try {
    await api.post('/sessions', { username, password });
    return { success: true };
  } catch (error) {
    let message = 'Unknown error!';
    if (error instanceof AxiosError) {
      const errorMessages = getBadRequestErrors(error);
      if (errorMessages && errorMessages.length) {
        message = errorMessages[0] as string;
      }
    }
    return { success: false, message: message };
  }
}

export { logIn };
