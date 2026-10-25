import { getAnnouncementList } from "../api/announcement";

class Announcement {
  public get = {
    list: async () => {
      return getAnnouncementList();
    }
  }
};

export const announcementService = new Announcement();
