import axios, { AxiosResponse } from "axios";
import { IUser } from "../../models/IUser";

export default class UserService {
  static async getUser(token: string): Promise<AxiosResponse<IUser>> {
    const API_URI = "https://backend-front-test.dev.echo-company.ru/api/user";
    return axios.get<IUser>(API_URI, { headers: { Authorization: token } });
  }
}
