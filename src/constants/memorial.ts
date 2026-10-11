import * as v from "valibot"
import { ListSchema } from "./List"

export const memorialAll = v.object({
  ...ListSchema.entries,
    content: v.array(
      v.object({
        id: v.number(),
        deceasedName: v.string(),
        birthDate: v.string(),
        deathDate: v.string(),
        location: v.string(),
        biography: v.string(),
        photoUrl: v.string(),
        visibility: v.picklist(["PUBLIC", "PRIVATE"]),
        status: v.picklist(["PENDING", "REJECT", "APPROVED", "CANCEL"]),
        createdBy: v.number(),
        updatedBy: v.number(),
        createdAt: v.string(),
        updatedAt: v.string()
      })
    )
})