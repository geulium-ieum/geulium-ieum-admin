import { TokenSchema } from '@/constants/user';
import { http } from '../ utils';
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
    });
    return v.parse(TokenSchema, response);
  } catch (error) {
    throw error;
  }
};
