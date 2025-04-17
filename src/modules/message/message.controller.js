import { Router } from "express";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as MV from "./message.validation.js";
import * as MS from "./message.service.js"
import { asyncHandler } from "../../utils/index.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.middleware.js";
import { roles } from "../../db/models/user.model.js";
import { endpoint } from "./message.endpoint.js";
const router = Router();

//create >> send
router.post(
    "/", isValid(MV.sendMessage), 
    asyncHandler(MS.sendMessage));  //post /message >> 
router.get(
    "/",isAuthenticate,
    isAuthorized(...endpoint.getMessage),
    asyncHandler(MS.getMessage)
);
router.delete(
    "/:id",
    isAuthenticate,
    isAuthorized(...endpoint.deleteMessage),
    isValid(MV.deleteMessage),
    asyncHandler(MS.deleteMessagge)
);
export default router;