import axios, { AxiosResponse } from "axios";
import type {
  RegisterUserData,
  ResponseRegisterUser,
  LoginUserData,
  ResponseLoginUser,
} from "../types/userTypes";

export async function createOneUser(
  datas: RegisterUserData
): Promise<AxiosResponse> {
  const responseApi = await axios.post<AxiosResponse<ResponseRegisterUser>>(
    "http://localhost:9600/api/v1/user/create",
    datas
  );
  return responseApi; // la il reçoit la response de l(api bonne ou mauvaise)
}

//fonction pour logger l'utilisateur
// datas passé en paramettre de la fonction sont les datas que le l'user va rentrer dans les input
export async function logOneUser(datas: LoginUserData): Promise<AxiosResponse> {
  const responseApi = await axios.post<AxiosResponse<ResponseLoginUser>>(
    "http://localhost:9600/api/v1/user/login",
    datas
  );
  return responseApi;
}
