import { MemorialListSchema, MemorialSchema } from "@/constants/memorial";
import { http } from "../utils";
import * as v from "valibot";
import { MemorialSortField, SortDirection } from "@/types/api";
import { getAccessToken } from "../server/auth";

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

export async function getMemorialDetail({
  token,
  id
}: {
  token: string
  id: string
}) {
  try {
    const response = await http.get(`admin/memorial/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).json();
    return v.parse(MemorialSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function postMemorialApprove({
  id
}: {
  id: string
}) {
  try {
    const token = await getAccessToken();
    await http.get(`admin/memorial/${id}/approve`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } catch (error) {
    throw error;
  }
}

export async function postMemorialReject({
  id
}: {
  id: string
}) {
  try {
    const token = await getAccessToken();
    await http.get(`admin/memorial/${id}/reject`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  } catch (error) {
    throw error;
  }
}
