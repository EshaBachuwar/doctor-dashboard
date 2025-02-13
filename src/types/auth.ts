export interface Doctor {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  specialization: string;
  email: string;
}

export interface AuthState {
  doctor: Doctor | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
