import { MemorialSortField, SortDirection } from "@/types/api"
import { getMemorialDetail, getMemorialList } from "../api/memorial"

class MemorialService {
  public get = {
    list: async ({
      token,
      searchParams
    }: {
      token: string
      searchParams: {
        page?: number
        size?: number
        sort?: [MemorialSortField, SortDirection]
      }
    }) => {
      return await getMemorialList({
        token,
        searchParams
      });
    },
    memorial: async ({
      token,
      id
    }: {
      token: string
      id: string
    }) => {
      return await getMemorialDetail({ token, id })
    }
  }
}

export const memorialService = new MemorialService();
