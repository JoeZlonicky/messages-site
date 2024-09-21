import { User } from '../../types/User';
import { api } from '../api';
import { redirectIfNoAuth } from '../redirectIfNoAuth';

type GetSessionUserResult = {
  success: boolean;
  user?: User;
};

async function getSessionUser(): Promise<GetSessionUserResult> {
  try {
    const response = await api.get('/sessions');
    const user = response.data as User;
    return { success: true, user };
  } catch (error) {
    redirectIfNoAuth(error);
    return { success: false };
  }
}

export { getSessionUser };
