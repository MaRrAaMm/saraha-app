import { roles } from "../../db/models/user.model.js";

export const endpoint = {
    getMessage:[roles.USER,roles.ADMIN],
    deleteMessage:[roles.USER]
}