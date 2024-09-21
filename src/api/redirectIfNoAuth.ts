import { AxiosError } from 'axios';

function redirectIfNoAuth(error: unknown) {
  if (error instanceof AxiosError && error.status && error.status === 401) {
    window.location.href = '/login';
  }
}

export { redirectIfNoAuth };
