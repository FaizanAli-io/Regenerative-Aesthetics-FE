interface User {
  id: number;
  name: string;
  email: string;
}

interface Login {
  accessToken: string;
  user: User;
}

interface Signup {
  user: User;
  isVerified: boolean;
}

export type { Login, User, Signup };
