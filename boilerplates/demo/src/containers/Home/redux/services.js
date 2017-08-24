import request from 'utils/request';

export function chart() {
  return request('/api/homeChart', { method: 'GET' });
}

export function table() {
  return request('/api/homeTable', { method: 'GET' });
}