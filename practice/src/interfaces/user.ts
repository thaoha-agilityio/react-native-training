export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  avatar?: string;
}

export type LoginPayload = Pick<User, 'email' | 'password'>;

export interface LoginResponse {
  accessToken: string;
  user: Omit<User, 'password'>;
}

export type UserPayload = Omit<User, 'password' | 'email ' | 'id'>;
