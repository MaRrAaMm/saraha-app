import { Router } from "express";
import * as userService from "./user.service.js"
import { isAuthenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

// get profile >> /user/profile
router.get(
    "/profile",
    isAuthenticate,
     userService.getProfile);

// freeze account
router.delete("/freeze", isAuthenticate, userService.freezeAccount)
export default router;