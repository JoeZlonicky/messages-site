import { User } from '../../types/User';
import { api } from '../api';
import { getBadRequestErrors } from '../getBadRequestErrors';
import { AxiosError } from 'axios';

type LogInResult = {
  success: boolean;
  message?: string;
  user?: User;
};

async function logIn(username: string, password: string): Promise<LogInResult> {
  try {
    const response = await api.post('/sessions', { username, password });
    const user = response.data as User;
    return { success: true, user };
  } catch (error) {
    let message = 'Unknown error!';
    if (error instanceof AxiosError) {
      const errorMessages = getBadRequestErrors(error);
      if (errorMessages && errorMessages.length) {
        message = errorMessages[0] as string;
      }
    }
    return { success: false, message };
  }
}

export { logIn };
