import { TOKEN_STORAGE_KEY } from '../services/user/constants';
import { HttpHeaders } from '@angular/common/http';

export const getAuthHeaders = (contentType: string = 'application/json') => {
  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  let headers = {};
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  if (contentType !== 'auto') {
    headers = { ...headers, 'Content-Type': contentType };
  }

  return new HttpHeaders(headers);
};
