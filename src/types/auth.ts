export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

