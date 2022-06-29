export interface User {
  username: string;
  displayName: string;
  token: string;
  image?: string;
}

export interface UserFormValues {
  email: string;
  username?: string;
  password: string;
  displayName?: string;
}
