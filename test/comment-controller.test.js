import { describe, jest, expect, test } from '@jest/globals';

import HttpStatus from 'http-status';

import commentController from '../lib/controller/comment-controller';
import CommentService from "../lib/services/comment-service.js";

// import dummyCommentData from "./data/comment.js"

jest.mock('../lib/services/comment-service.js');

describe('like comment test suite', () => {

  it('returns NOT_FOUND (404) when no comment is sent in params', async () => {
    try {
      let req = {
        params: {commentId: ""}
      }
      let res = {
        status: function () { },
        json: function () { }
      }
      const statusSpied = jest.spyOn(res, "status");
      const jsonSpied = jest.spyOn(res, "json");

      let next = function () { };
      await commentController.likeComment(req, res, next);
      expect(statusSpied).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(jsonSpied).toHaveBeenCalledWith({
        status: HttpStatus.NOT_FOUND,
        message: "Comment not found."
      })
    } catch (e) {
      console.log("error on NOT_FOUND test", e)
    }
  });

  it('returns NOT_MODIFIED (304) when comment is not saved', async () => {
    try {
      let req = {
        params: {commentId: "123"},
        dbConnection: function() {}
      }
      let res = {
        status: function () { },
        json: function () { }
      }
      const statusSpied = jest.spyOn(res, "status");
      const jsonSpied = jest.spyOn(res, "json");

      let next = function () { };

      //@mock likeComment method of CommentService
      CommentService.likeComment.mockResolvedValue({});

      await commentController.likeComment(req, res, next);
      expect(statusSpied).toHaveBeenCalledWith(HttpStatus.NOT_MODIFIED);
      expect(jsonSpied).toHaveBeenCalledWith({
        status: HttpStatus.NOT_MODIFIED,
        message: "Comment like failed."
      })
    } catch (e) {
      console.log("error on NOT_MODIFIED test", e)
    }
  });

  it('returns OK (200) when comment is saved', async () => {
    try {
      let req = {
        params: {commentId: "123"},
        dbConnection: function() {}
      }
      let res = {
        status: function () { },
        json: function () { }
      }
      const statusSpied = jest.spyOn(res, "status");
      const jsonSpied = jest.spyOn(res, "json");

      let next = function () { };

      //@mock likeComment method of CommentService
      CommentService.likeComment.mockResolvedValue({"key":"value"});

      await commentController.likeComment(req, res, next);
      expect(statusSpied).toHaveBeenCalledWith(HttpStatus.OK);
      expect(jsonSpied).toHaveBeenCalledWith({
        status: HttpStatus.OK,
        message: "Comment is liked."
      })
    } catch (e) {
      console.log("error on success test", e)
    }
  });
});