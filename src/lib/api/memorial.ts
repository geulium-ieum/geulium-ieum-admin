import { MemorialListSchema } from "@/constants/memorial";
import { http } from "../utils";
import * as v from "valibot";
import { MemorialSortField, SortDirection } from "@/types/api";

export async function getMemorialList({
  token,
  searchParams
}: {
  token: string;
  searchParams: {
    page?: number
    size?: number
    sort?: [MemorialSortField, SortDirection]
  }
}) {
  try {
    const response = await http.get("admin/memorial/all", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      searchParams: {
        page: searchParams.page,
        size: searchParams.size,
        sort: searchParams.sort && searchParams.sort.join(",")
      }
    }).json();
    return v.parse(MemorialListSchema, response);
  } catch (error) {
    throw error;
  }
}
