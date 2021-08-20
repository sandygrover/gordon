import { apiClient } from './apiConfig';

export async function getApi(endpoint, arg) {
  let quertString = Object.keys(arg)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(arg[k])}`)
    .join('&');
  return await apiClient.get(`${endpoint}?${quertString}`);
}

export async function deleteApi(endpoint, id) {
  return await apiClient.delete(`${endpoint}/${id}`);
}

export async function postApi(endpoint, arg) {
  return await apiClient.post(`${endpoint}`, arg);
}

export async function putApi(endpoint, id, arg) {
  return await apiClient.put(`${endpoint}/${id}`, arg);
}
