interface User {
  id: number;
  name: string;
  email: string;
}

interface Login {
  accessToken: string;
  user: User;
}

export type { Login, User };
