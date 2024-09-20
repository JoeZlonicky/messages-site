import Axios from 'axios';

const api = Axios.create({
  baseURL: import.meta.env.VITE_MESSAGES_API_URL,
  withCredentials: true,
});

export { api };
