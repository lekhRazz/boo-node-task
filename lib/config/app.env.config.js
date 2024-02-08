import * as dotenv from 'dotenv';
dotenv.config();

export default {
  service: {
    port: process.env.PORT
  },
  db:{
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT
  },
  collections: {
    UserProfile: "UserProfile",
    Comments: "Comments",
    Rating: "Rating"
  }
}