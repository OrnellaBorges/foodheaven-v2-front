export type RegisterUserData = {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
};

export type ResponseRegisterUser = {
    status: number;
    msg: string;
    err?: any;
};

/* {
    status
    msg
    error?
    token?
    user_id?
} */
