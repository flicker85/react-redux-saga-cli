import request from 'utils/request';

export function test() {
  return request('/api/test', { method: 'GET' });
}