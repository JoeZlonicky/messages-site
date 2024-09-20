import { User } from '../types/User';
import { api } from './api';

type GetUsersResult = {
  success: boolean;
  users?: User[];
};

async function getUsers(): Promise<GetUsersResult> {
  try {
    const response = await api.get('/users');
    const users = response.data as User[];
    return { success: true, users };
  } catch {
    return { success: false };
  }
}

export { getUsers };
