'use strict';

import appEnvConfig from "../config/app.env.config.js";
import personalityConfig from "../config/personality.config.js";
import DataObjectGenerator from "../utils/data-object-generator.js";
import { getPaginationOpts } from "../utils/pagination.js";
import commentModel from "../db/models/CommentModel.js";

class CommentService {
    async postComment(commentData, dbConnection) {
       return new Promise(async(resolve, reject)=>{
          try {
            const commentDataObject = DataObjectGenerator.save(commentData, commentModel);
            
            commentDataObject['mbti'] = commentDataObject['mbti'].toLowerCase();
            commentDataObject['enneagram'] = commentDataObject['enneagram'].toLowerCase();
            commentDataObject['zodiac'] = commentDataObject['zodiac'].toLowerCase();
            
            commentDataObject['likes'] = 0;
            commentDataObject['voting'] = {mbti: personalityConfig.mbti, enneagram: personalityConfig.enneagram, zodiac: personalityConfig.zodiac};
            
            const insertResponse = await dbConnection.collection(appEnvConfig.collections.Comments).insertOne(commentDataObject);
            
           return resolve({insertResponse, commentDataObject});

          } catch (error) {
            return reject(error);
          }
       })
    }

    async getComments(req, dbConnection){
      return new Promise(async(resolve, reject)=>{
        try {
          const paginationOpts = getPaginationOpts(req.query);

          const filterOpts = {deleted: false};
          
          if(req.query.filter['mbti']){
            filterOpts['mbti'] = req.query.filter['mbti'].toLowerCase();
          }
          
          if(req.query.filter['zodiac']) {
            filterOpts['zodiac'] = req.query.filter['zodiac'].toLowerCase();
          }

          if(req.query.filter['enneagram']){
            filterOpts['enneagram'] = req.query.filter['enneagram'].toLowerCase();
          }


          let sortOpts = {};
         

          if(req.query['sort']&&req.query['sort'].toLowerCase() === 'best'){
            sortOpts = { likes: -1}
          }else{
            sortOpts = { createdAt: -1}

          }

          const [list, count] = await Promise.all([
            dbConnection.collection(appEnvConfig.collections.Comments).aggregate([
              {
                $match: filterOpts
              },
              {
                $sort: sortOpts
              },
              {
                $skip: paginationOpts.skip
              },
              {
                $limit: paginationOpts.perpage
              }
            ]).toArray(),
            dbConnection.collection(appEnvConfig.collections.Comments).count(filterOpts)
          ])
          
          return resolve([list, count, paginationOpts]);
        } catch (error) {
          return reject(error);
        }
      })
    }

    async likeComment(commentId, dbConnection){
      return new Promise(async(resolve, reject)=>{
        try {
          const checkComment = await dbConnection.collection(appEnvConfig.collections.Comments).findOne({_id: commentId, deleted: false});
          if(checkComment && Object.keys(checkComment).length){
            const newLikes = checkComment['likes']+1;
            const updateCommentLike = await dbConnection.collection(appEnvConfig.collections.Comments).updateOne({_id: commentId}, {$set:{likes: newLikes}});
            return resolve(updateCommentLike);
          }
          return resolve({});
        } catch (error) {
          return reject(error);
        }
      })
    }

    async voteComment(commentId, voteObject, dbConnection){
      return new Promise(async(resolve, reject)=>{
        try {
          const checkComment = await dbConnection.collection(appEnvConfig.collections.Comments).findOne({_id: commentId, deleted: false});
          if(checkComment && Object.keys(checkComment).length){

            if(voteObject['mbti']) {
              checkComment['voting']['mbti'][voteObject['mbti']]= checkComment['voting']['mbti'][voteObject['mbti']] + 1;
            }
            
            if(voteObject['enneagram']){
              checkComment['voting']['enneagram'][voteObject['enneagram']]  = checkComment['voting']['enneagram'][voteObject['enneagram']] + 1;
            }
            
            if(voteObject['zodiac']){
              checkComment['voting']['zodiac'][voteObject['zodiac']]  = checkComment['voting']['zodiac'][voteObject['zodiac']] + 1;
            }
            const updateCommentLike = await dbConnection.collection(appEnvConfig.collections.Comments).updateOne({_id: commentId}, {$set:{voting: checkComment.voting}});
            return resolve(updateCommentLike);
          }
          return resolve({});
        } catch (error) {
          return reject(error);
        }
      })
    }
}

export default new CommentService();
