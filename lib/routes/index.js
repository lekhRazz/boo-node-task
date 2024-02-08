'use strict';

import { Router } from 'express';

import commentRouter from "./comment-router.js";
import profileRouter from "./profile-router.js";

const router = Router({caseSensitive: true});

router.use("/profile", profileRouter);
router.use("/comment", commentRouter);


export default router;