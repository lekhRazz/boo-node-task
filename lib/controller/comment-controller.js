'use strict';
import HTTPStatus from "http-status";

import messageConfig from "../config/message.config.js";
import CommentService from "../services/comment-service.js";


class CommentController {
    async postComment(req, res, next) {
        try {
          const postCommentRespose = await CommentService.postComment(req.body, req.dbConnection);
          if(postCommentRespose && postCommentRespose.insertResponse){
            
            //@send success response on successful insertion of data
            res.status(200);
            return res.json({
              data: postCommentRespose.commentDataObject,
              status: 200,
              message: messageConfig.SUCCESS_COMMENT,
            });
          }

          // @send failed response on failed data insertion
          res.status(304);
          return res.json({
            status: 304,
            message: messageConfig.ERR_PROFILE_CREATE_FAIL
          });
    
        } catch (error) {
          return next(error);
        }
    }

    async getComments(req, res, next){
      try {

        const [list, count, pagination] = await CommentService.getComments(req, req.dbConnection);
        if(list && list.length){
          //@send successful response
          res.status(200);
          return res.json({
            status: 200,
            message: "data fetched",
            data: list,
            pagination: {
              totalItems: count,
              perpage: pagination.perpage,
              currentPage: pagination.page,
              totalPages: Math.ceil(count/pagination.perpage)
            }
          });
        }
        
        res.status(404);
        return res.json({
          status: 404, 
          message: "Comments not found."
        });
      } catch (error) {
        return next(error);
      }
    }

    async likeComment(req, res, next){
      try {

        if(req.params.commentId&&req.params.commentId.trim().length){

          const likeCommentResponse = await CommentService.likeComment(req.params.commentId, req.dbConnection);
          if(likeCommentResponse && Object.keys(likeCommentResponse).length){

            //@send successful response
            res.status(200);
            return res.json({
              status: 200,
              message: "Comment is liked."
            });
          }

          //@send failed response
          res.status(HTTPStatus.NOT_MODIFIED);
          return res.json({
            status: HTTPStatus.NOT_MODIFIED,
            message: 'Comment like failed.',
          });

        }
        
        //@send failed response
        res.status(404);
        return res.json({
          status: 404,
          message: 'Comment not found.',
        });
        
      } catch (error) {
        return next(error);
      }
    }

    async voteComment(req, res, next){
      try {

        if(req.params.commentId&&req.params.commentId.trim().length){

          const voteCommentResponse = await CommentService.voteComment(req.params.commentId, req.body, req.dbConnection);
          if(voteCommentResponse && Object.keys(voteCommentResponse).length){

            //@send successful response
            res.status(200);
            return res.send({
              status: 200,
              message: "Vote is submitted."
            });
          }
        }
        
        //@send failed response
        res.status(404);
        return res.json({
          status: 404,
          message: 'Comment not found.',
        });
        
      } catch (error) {
        return next(error);
      }
    }
}

export default new CommentController();
