import { AnnouncementSortField, SortDirection } from "@/types/api";
import { getAnnouncementList } from "../api/announcement";

class Announcement {
  public get = {
    list: async ({ searchParams }: {
      searchParams: {
        page?: number
        size?: number
        sort?: [AnnouncementSortField, SortDirection]
      }
    }) => {
      return getAnnouncementList({ searchParams });
    }
  }
};

export const announcementService = new Announcement();
