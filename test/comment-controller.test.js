import { describe, jest, expect, test } from '@jest/globals';

import HttpStatus from 'http-status';

import commentController from '../lib/controller/comment-controller';
import dummyCommentData from "./data/comment.js"
// import { getSqlDetail } from "../db-services/get-db-service.js";

describe('like comment test', () => {

  test('returns NOT_FOUND (404) when no comment is sent in params response', async () => {
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
      console.log("error", e)
    }
  });

});