import { User } from '../../types/User';
import { api } from '../api';
import { getBadRequestErrors } from '../getBadRequestErrors';
import { AxiosError } from 'axios';

type SignUpResult = {
  success: boolean;
  messages: string[];
  user?: User;
};

async function signUp(
  username: string,
  displayName: string,
  password: string,
  confirmPassword: string,
  signUpSecret: string,
): Promise<SignUpResult> {
  try {
    const response = await api.post('/users', {
      username,
      displayName,
      password,
      confirmPassword,
      signUpSecret,
    });
    const user = response.data as User;
    return { success: true, messages: [], user };
  } catch (error) {
    let messages = ['Unknown error!'];
    if (error instanceof AxiosError) {
      const errorMessages = getBadRequestErrors(error);
      if (errorMessages && errorMessages.length) {
        messages = errorMessages;
      }
    }
    return { success: false, messages };
  }
}

export { signUp };
