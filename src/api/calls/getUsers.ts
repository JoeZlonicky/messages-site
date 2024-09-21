import { User } from '../../types/User';
import { api } from '../api';
import { throwIfNoAuth } from '../throwIfNoAuth';

type GetUsersResult = {
  success: boolean;
  users?: User[];
};

async function getUsers(): Promise<GetUsersResult> {
  try {
    const response = await api.get('/users');
    const users = response.data as User[];
    return { success: true, users };
  } catch (error) {
    throwIfNoAuth(error);
    return { success: false };
  }
}

export { getUsers };
