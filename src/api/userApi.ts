import axios, { AxiosResponse } from "axios";
import type {
    RegisterUserData,
    ResponseRegisterUser,
} from "../types/userTypes";

export async function createOneUser(
    datas: RegisterUserData
): Promise<AxiosResponse> {
    const response = await axios.post<AxiosResponse<ResponseRegisterUser>>(
        "http://localhost:9600/api/v1/user/create",
        datas
    );
    return response;
}

/* export async function loginUser(datas) {
    const response = await axios.get<AxiosResponse<ResponseRegisterUser>>(
        "http://localhost:9600/api/v1/user/login",
        datas
    );
    return response;
} */
