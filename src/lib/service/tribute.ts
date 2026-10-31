import { SortDirection, TributeSortField } from "@/types/api"
import { deleteTribute, getTributeList } from "../api/tribute"

class TributeService {
  public get = {
    list: async ({
      token,
      searchParams
    }: {
      token: string
      searchParams: {
        page?: number
        size?: number
        sort?: [TributeSortField, SortDirection]
      }
    }) => {
      return await getTributeList({
        token,
        searchParams
      })
    }
  }
  public delete = {
    tribute: async ({
      token,
      id
    }: {
      token: string
      id: string
    }) => {
      return await deleteTribute({
        token,
        id
      })
    }
  }
}

export const tributeService = new TributeService()
