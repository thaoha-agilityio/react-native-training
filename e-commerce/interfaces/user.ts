export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  avatar?: string;
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  bankAccountNumber?: string;
  accountHolderName?: string;
  zipCode?: string;
}

export type LoginPayload = Pick<User, 'email' | 'password'>;

export interface LoginResponse {
  accessToken: string;
  user: Omit<User, 'password'>;
}

export type UserPayload = Omit<User, 'password' | 'email ' | 'id'>;
