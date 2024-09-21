import { NoAuthError } from './NoAuthError';
import { AxiosError } from 'axios';

function throwIfNoAuth(error: unknown) {
  if (error instanceof AxiosError && error.status && error.status === 401) {
    throw new NoAuthError();
  }
}

export { throwIfNoAuth };
