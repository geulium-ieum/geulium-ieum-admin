import { RecentUserSortField, SortDirection } from "@/types/api";
import { getActiveMemorial, getActiveUser, getRecentUser, getStats } from "../api/dashboard";

class DashboardService {
  public get = {
    activeMemorial: async ({
      token,
      days
    }: {
      token: string;
      days: number;
    }) => {
      return await getActiveMemorial({
        token,
        days
      })
    },
    activeUser: async ({
      token,
      days
    }: {
      token: string;
      days: number;
    }) => {
      return await getActiveUser({
        token,
        days
      })
    },
    recentUser: async ({
      token,
      searchParams
    }: {
      token: string
      searchParams: {
        page?: number
        size?: number
        sort?: [RecentUserSortField, SortDirection]
      }
    }) => {
      return getRecentUser({
        token,
        searchParams
      })
    },
    stats: async ({
      token
    }: {
      token: string
    }) => {
      return getStats({
        token
      })
    }
  }
}

export const dashboardService = new DashboardService();
