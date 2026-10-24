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
      try {
        return await getTributeList({
          token,
          searchParams
        })
      } catch (error) {
        throw error
      }
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
      try {
        return await deleteTribute({
          token,
          id
        })      
      } catch (error) {
        throw error
      }
    }
  }
}

export const tributeService = new TributeService()
