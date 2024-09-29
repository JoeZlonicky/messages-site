import { api } from '../api';
import { redirectIfNoAuth } from '../redirectIfNoAuth';

async function logOut(): Promise<boolean> {
  try {
    await api.delete('/sessions');
    return true;
  } catch (error) {
    redirectIfNoAuth(error);
    return false;
  }
}

export { logOut };
