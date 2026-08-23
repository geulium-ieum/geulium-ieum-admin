import { LoginRequest } from "@/types/api";
import { postLogin } from "../api/auth";

class UserService {
  public get = {

  }
  public post = {
    login: async ({ email, password }: LoginRequest) => {
      return await postLogin({ email, password });
    },
  }
}

export const userService = new UserService();
