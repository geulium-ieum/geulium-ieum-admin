import ky from "ky";

export const http = ky.create({
  prefix: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
});
