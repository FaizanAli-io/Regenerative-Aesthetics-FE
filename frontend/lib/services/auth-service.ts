interface User {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export type { User };
