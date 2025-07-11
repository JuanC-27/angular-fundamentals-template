export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  successful: boolean;
  result?: string; // token
  user?: {
    email: string;
    name: string;
    role?: string;
  };
}
