'use server'

import { LoginRequest, TokenResponse } from "@/types/api";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { userService } from "../service/user";

export async function login({ email, password }: LoginRequest) {
  const data = await userService.post.login({ email, password });
  await setToken(data);
  redirect("/");
};

export async function getAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken');
  return token?.value;
};

export async function getRefreshToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken');
  return token?.value;
};

export async function setToken(data: TokenResponse) {
  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === "production";
  const sameSite = process.env.NODE_ENV === "production" ? "strict" : "lax";
  cookieStore.set({
    name: 'accessToken',
    value: data.accessToken,
    httpOnly: true,
    maxAge: data.accessTokenExpiresIn / 1000,
    secure,
    sameSite
  });
  cookieStore.set({
    name: 'refreshToken',
    value: data.refreshToken,
    httpOnly: true,
    maxAge: data.refreshTokenExpiresIn / 1000,
    secure,
    sameSite
  });
};

export async function deleteToken() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('accessToken')!.value;
    await userService.post.logout({ refreshToken })
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    redirect("/login", RedirectType.replace);
  } catch (error) {
    throw error;
  }
};
