import { AnnouncementSortField, SortDirection } from "@/types/api";
import { deleteAnnouncementDetail, getAnnouncementDetail, getAnnouncementList, postAnnouncement, postAnnouncementPublish, putAnnouncementDetail } from "../api/announcement";

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
    },
    detail: async ({ id }: { id: string }) => {
      return getAnnouncementDetail({ id });
    }
  }
  public post = {
    create: async ({
      title,
      content,
      isPinned
    }: {
      title: string
      content: string
      isPinned: boolean
    }) => {
      return await postAnnouncement({
        title,
        content,
        isPinned
      })
    },
    publish: async ({ id }: { id: string }) => {
      return await postAnnouncementPublish({ id })
    }
  }
  public put = {
    detail: async ({
      id,
      title,
      content,
      isPinned
    }: {
      id: string
      title: string
      content: string
      isPinned: boolean
    }) => {
      return await putAnnouncementDetail({
        id,
        title,
        content,
        isPinned
      });
    }
  }
  public delete = {
    detail: async ({ id }: { id: string }) => {
      return await deleteAnnouncementDetail({ id });
    }
  }
};

export const announcementService = new Announcement();
