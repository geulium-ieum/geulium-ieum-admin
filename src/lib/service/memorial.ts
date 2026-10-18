import { MemorialSortField, SortDirection } from "@/types/api"
import { getMemorialList } from "../api/memorial"

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
    
  }
}

export const memorialService = new MemorialService();
