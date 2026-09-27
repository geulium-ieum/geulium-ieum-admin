"use server"

import { refresh } from "next/cache";
import { HTTPError } from "ky";
import { auditService } from "../service/auditLog";
import { getAccessToken } from "./auth";

export type DLQActionState = {
  error?: string
  // 같은 에러가 연속으로 나도 클라이언트에서 변화를 감지할 수 있도록 매 호출마다 갱신
  timestamp?: number
};

function parseMax(formData: FormData) {
  const max = Number(formData.get("max"));
  return Number.isInteger(max) && max > 0 ? max : undefined;
};

function toErrorState(error: unknown): DLQActionState {
  console.error(error);
  const message = error instanceof HTTPError
    && typeof error.data === "object"
    && error.data !== null
    && "message" in error.data
    ? String(error.data.message)
    : "알 수 없는 오류가 발생했습니다";
  return { error: message, timestamp: Date.now() };
};

export async function reprocess(
  _prevState: DLQActionState,
  formData: FormData
): Promise<DLQActionState> {
  const token = await getAccessToken();
  if (!token) return { error: "로그인이 필요합니다", timestamp: Date.now() };
  try {
    await auditService.post.DLQReprocess({
      token,
      max: parseMax(formData)
    })
  } catch (error) {
    return toErrorState(error)
  }
  refresh()
  return {}
};

export async function purge(
  _prevState: DLQActionState,
  formData: FormData
): Promise<DLQActionState> {
  const token = await getAccessToken();
  if (!token) return { error: "로그인이 필요합니다", timestamp: Date.now() };
  try {
    await auditService.delete.DLQPurge({
      token,
      max: parseMax(formData)
    })
  } catch (error) {
    return toErrorState(error)
  }
  refresh()
  return {}
};
