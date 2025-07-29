import { IUserData } from '@/shared/api';

export interface IResponseDataWithToken extends IUserData {
  accessToken: string;
  refreshToken: string;
}

