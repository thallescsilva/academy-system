export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: 'ADMIN' | 'COORDINATOR' | 'PROFESSOR' | 'STUDENT';
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
