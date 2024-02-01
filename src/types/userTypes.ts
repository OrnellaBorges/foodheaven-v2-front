export type RegisterUserData = {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type ResponseRegisterUser = {
  status: number;
  msg: string;
  err?: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type ResponseLoginUser = {
  status: number;
  msg: string;
  error?: string;
  token?: any;
  user_id?: any;
};

/* {
    token?
    user_id?
} */
