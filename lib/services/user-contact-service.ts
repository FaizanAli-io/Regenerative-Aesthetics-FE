import { User } from './auth-service';
import create from './http-service';

interface UserDetailsReq {
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  label: string;
}

interface UserDetailsRes extends UserDetailsReq {
  id: number;
  user: User;
}

export default create('/users/contact');
export type { UserDetailsReq, UserDetailsRes };
