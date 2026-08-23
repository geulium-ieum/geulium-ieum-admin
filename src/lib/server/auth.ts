'use server'

import { TokenResponse } from "@/types/api";
import { cookies } from "next/headers"

export async function setToken(data: TokenResponse) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'token',
    value: data.accessToken,
    httpOnly: true,
    maxAge:  data.accessTokenExpiresIn,
    secure: process.env.NODE_ENV === "production"
  })
};

export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}
