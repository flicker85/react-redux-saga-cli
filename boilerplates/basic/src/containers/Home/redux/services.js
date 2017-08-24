import request from 'utils/request';

export function table() {
  return request('/api/homeTable', { method: 'GET' });
}