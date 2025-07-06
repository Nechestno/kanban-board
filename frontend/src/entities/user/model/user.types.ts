import { IUserData } from '@/shared/api';

export interface IResponseDataWithToken extends IUserData {
  token: string;
}

