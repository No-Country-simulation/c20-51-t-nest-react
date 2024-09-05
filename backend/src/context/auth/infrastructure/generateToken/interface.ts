export interface PayloadGenerateToken {
  id: string;
  email: string;
  role: string;
}

export interface PayloadJwt {
  iss?: string;
  sub?: string;
  aud?: string[];
  iat?: number;
  exp?: number;
  azp?: string;
  scope?: string;
  role?: string;
}
