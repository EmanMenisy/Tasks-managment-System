export interface SignUpData {
  name: string;
  department?: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  data: SignUpData;
}

