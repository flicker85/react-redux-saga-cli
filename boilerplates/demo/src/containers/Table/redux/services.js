import request from 'utils/request';

export function table() {
  return request('/api/tableTable?_sort=id&_order=desc', { method: 'GET' });
}

export function create(data) {
  return request('/api/tableTable', { method: 'POST', body: JSON.stringify(data) });
}

export function remove(id) {
  return request(`/api/tableTable/${id}`, { method: 'DELETE' });
}

export function edit(id, data) {
  return request(`/api/tableTable/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}