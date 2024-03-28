import axios from '../../node_modules/axios/index';

export const req = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});
