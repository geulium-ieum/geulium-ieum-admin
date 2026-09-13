import { TokenSchema } from '@/constants/user';
import { http } from '../utils';
import * as v from 'valibot';

export async function postLogin({
  email,
  password
}: {
  email: string
  password: string
}) {
  try {
    const response = await http.post("auth/login", {
      json: {
        email,
        password
      }
    }).json();
    return v.parse(TokenSchema, response);
  } catch (error) {
    throw error;
  }
};

export async function postRefreshToken({
  refreshToken
}: {
  refreshToken: string
}) {
  try {
    const response = await http.post("auth/refresh", {
      json: { refreshToken }
    }).json();
    return v.parse(TokenSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function postLogout({
  refreshToken
}: {
  refreshToken: string
}) {
  try {
    await http.post("auth/logout", {
      json: { refreshToken }
    });
  } catch (error) {
    throw error;
  }
}
