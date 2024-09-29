import { AxiosError } from 'axios';

function getBadRequestErrors(error: AxiosError) {
  const data = error?.response?.data;
  if (
    !(data instanceof Object) ||
    !('errors' in data) ||
    !Array.isArray(data.errors)
  ) {
    return null;
  }

  return data.errors.filter((msg) => typeof msg === 'string');
}

export { getBadRequestErrors };
