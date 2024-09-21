import { User } from '../../types/User';
import { api } from '../api';
import { redirectIfNoAuth } from '../redirectIfNoAuth';

type GetUsersResult = {
  success: boolean;
  users?: User[];
};

async function getAllUsers(): Promise<GetUsersResult> {
  try {
    const response = await api.get('/users');
    const users = response.data as User[];
    return { success: true, users };
  } catch (error) {
    redirectIfNoAuth(error);
    return { success: false };
  }
}

export { getAllUsers };
