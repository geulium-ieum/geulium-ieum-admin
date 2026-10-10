/**
 * accessToken(JWT) payload에서 role claim을 꺼낸다.
 * 서명 검증은 하지 않으므로 화면 표시용으로만 사용하고, 권한 판단에는 쓰지 않는다.
 * ("ROLE_ADMIN" 처럼 prefix가 붙은 값은 제거한다.)
 */
export function getRoleFromToken(token?: string): string | undefined {
  const payload = token?.split(".")[1];
  if (!payload) return undefined;
  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof claims.role === "string" ? claims.role.replace(/^ROLE_/, "") : undefined;
  } catch {
    return undefined;
  }
}
