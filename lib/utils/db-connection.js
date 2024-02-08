import { MongoMemoryServer } from 'mongodb-memory-server';

import {MongoClient} from "mongodb";

import config from "../config/app.env.config.js";

class Database {
    DB_NAME =config.db.DB_NAME
    DB_USERNAME=config.db.DB_USERNAME;
    DB_PASSWORD=config.db.DB_PASSWORD;
    DB_HOST=config.db.DB_HOST;
    DB_PORT=config.db.DB_PORT;

  constructor() {
 
  }

  async checkDbConnection(){
    return new Promise(async(resolve, reject)=>{
      try {
        await this.setMongoDBConnection();
        await this.client.connect();
        console.log('Connected successfully to Mongodb server');
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    })
  }

  async setMongoDBConnection() {
    this.mongod = await MongoMemoryServer.create();
    this.client = new MongoClient(this.mongod.getUri());
    this.instance =this.client.db(this.DB_NAME);
  }

  getDbInstance(){
    if(this.instance ===null) {
      this.instance =this.client.db(this.DB_NAME);
    } 
    return this.instance;
  }
}

export default Database;
