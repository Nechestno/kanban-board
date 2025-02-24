export interface ILoginData {
  login: string;
  password: string;
}

export interface IUserData extends ILoginData {
  name: string;
}

export interface IUserDataWithToken extends IUserData {
  token: string;
}

export interface IResponseDataWithToken extends IUserData {
  token: string;
}

