import { MemorialSortField, SortDirection } from "@/types/api"
import { getMemorialDetail, getMemorialList, patchMemorialApprove, patchMemorialReject } from "../api/memorial"

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
      return await getMemorialDetail({
        token,
        id
      })
    }
  }
  public patch = {
    approve: async ({ id }: { id: string }) => {
      return await patchMemorialApprove({ id })
    },
    reject: async ({ id }: { id: string }) => {
      return await patchMemorialReject({ id })
    }
  }
}

export const memorialService = new MemorialService();
