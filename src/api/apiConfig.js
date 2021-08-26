import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URL}`;

export const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000
});

export function setAuthorizationHeader(token = null) {
  if (token) {
    apiClient.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.authorization;
  }
}
