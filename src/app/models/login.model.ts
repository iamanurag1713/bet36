export interface LoginRequest {
  userId: string;
  pass: string;
  validCode: string;
}

export interface LoginResponse {
  status: boolean;
  token?: string;
  message?: string;
}

export interface UserBalanceResponse {
  balance: string;
  expo: string;
}
