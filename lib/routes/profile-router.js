'use strict';

import { Router } from 'express';

import ProfileController from "../controller/profile-controller.js";
import multerUtils from "../utils/multer.utils.js";

const router = Router({caseSensitive: true});

router.post("/upload", multerUtils.uploadUtils().single("file"), ProfileController.uploadProfile);
router.get("/info/:userId", ProfileController.getUserProfile);




export default router;