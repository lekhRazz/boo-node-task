'use strict';
import HTTPStatus from "http-status";

import messageConfig from "../config/message.config.js";
import ProfileService from "../services/profile-service.js";
import buildTemplate from "../utils/template-builder.js";


class ProfileController {
    async uploadProfile(req, res, next) {
        try {

          if(req.body.name && req.body.name.trim().length===0){
            res.status(HTTPStatus.BAD_REQUEST);
            return res.json({
              data: {},
              status: HTTPStatus.BAD_REQUEST,
              message: "Name is required"
            });

          }
          const filename = req.file?.filename || "";
          req.body["file"] = filename;
          
          const uploadProfile = await ProfileService.uploadProfile(req.body, req.dbConnection);
          if(uploadProfile && uploadProfile.insertResponse){
            
            //@send success response on successful insertion of data
            res.status(HTTPStatus.OK);
            return res.json({
              data: uploadProfile.userProfileObject,
              status: HTTPStatus.OK,
              message: messageConfig.SUCCESS_PROFILE_CREATE,
            });
          }

          // @send failed response on failed data insertion
          res.status(HTTPStatus.NOT_MODIFIED);
          return res.json({
            status: HTTPStatus.NOT_MODIFIED,
            message: messageConfig.ERR_PROFILE_CREATE_FAIL
          });
    
        } catch (error) {
          return next(error);
        }
    }

    async getUserProfile(req, res, next){
      try {

        if(req.params.userId&&req.params.userId.trim().length){

          const userProfileInfo = await ProfileService.getProfileDetail(req.params.userId, req.dbConnection);
          if(userProfileInfo && Object.keys(userProfileInfo).length){

            const template = buildTemplate(userProfileInfo);
            
            //@send successful response
            res.status(200);
            return res.send(template);
          }
        }
        
        //@send failed response
        res.status(404);
        return res.json({
          status: 404,
          message: 'User profile not found.',
        });
        
      } catch (error) {
        return next(error);
      }
    }
}

export default new ProfileController();
