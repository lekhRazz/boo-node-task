'use strict';

import { Router } from 'express';

import CommentController from "../controller/comment-controller.js";

const router = Router({caseSensitive: true});

router.post("/create", CommentController.postComment);
router.get("/list", CommentController.getComments);
router.put("/like/:commentId", CommentController.likeComment);
router.put("/vote/:commentId", CommentController.voteComment)






export default router;