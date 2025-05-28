import { LoginPayload, LoginResponse, User } from '@/interfaces';

export const MOCK_USER: Omit<User, 'password'> = {
  id: '1',
  username: 'John',
  email: 'john@gmail.com',
};

export const USER_INVALID = {
  email: 'tester.gmail.com',
  password: 'Tester123@',
};

export const LOGIN_PAYLOAD: LoginPayload = {
  email: 'thao.ha+4@asnet.com.vn',
  password: 'abcd1234',
};

export const LOGIN_RESPONSE: LoginResponse = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5nb2MubmdvKzFAYXNuZXQuY29tLnZuIiwiaWF0IjoxNzEwNDM1MzExLCJleHAiOjE3MTA0Mzg5MTEsInN1YiI6IjMifQ.1eciI3z7JnR8ahbBqgF3shKh34LCL7ANJpACswk3v-U',
  user: {
    id: '1',
    email: 'tester@gmail.com',
    username: 'James',
  },
};
