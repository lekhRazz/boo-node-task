'use strict';

import appEnvConfig from "../config/app.env.config.js";
import DataObjectGenerator from "../utils/data-object-generator.js";
import userProfileModel from "../db/models/UserProfileModel.js";

class ProfileService {
    async uploadProfile(profileData, dbConnection){
       return new Promise(async(resolve, reject)=>{
        try {
            
            const userProfileObject = DataObjectGenerator.save(profileData, userProfileModel);
            const insertResponse = await dbConnection.collection(appEnvConfig.collections.UserProfile).insertOne(userProfileObject);
            
           return resolve({insertResponse, userProfileObject});
        } catch (err) {
            return reject(err);
        }
       })
    }

    async getProfileDetail(userId, dbConnection){
      return new Promise(async(resolve, reject)=>{
        try {
            const userProfile = await dbConnection.collection(appEnvConfig.collections.UserProfile).findOne({_id: userId, deleted: false});
            if(userProfile && Object.keys(userProfile).length) return resolve(userProfile);
            return resolve({});
        } catch (error) {
            return reject(error);
        }
      })

    }
}


export default new ProfileService();