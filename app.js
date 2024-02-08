import express from 'express';

import cors from "cors";

import helmet from "helmet";

import { v4 } from "uuid";

import messageConfig from "./lib/config/message.config.js";
import routes from "./lib/routes/index.js";
import DbConnectionUtil from "./lib/utils/db-connection.js";

const app = express();

try {
    const DbConnUtil = new DbConnectionUtil();
    
    //@check mongodb connection
    await DbConnUtil.checkDbConnection();

    //@get mongodb connection instance
    const DB_Instance = DbConnUtil.getDbInstance();


    //@initiate express middleware to set debug in request for debugging purpose
    app.use((req, res, next) => {
      req.debug = {
        debugId: v4(),
        origin: req.headers['origin'],
        method: req.method,
        originalUrl: req.originalUrl
      }
      req.dbConnection = DB_Instance;
      return next();
    })

    // ================= set express middlewares(plugins)==========================
    app.use(cors());
    app.options('*', cors());
    app.use(helmet());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,x-access-token,Accept,Origin');
        res.setHeader('Cache-Control', 'no-cache="Set-Cookie, Set-Cookie2"');
        next();
    });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/uploads", express.static("uploads"));


    //@initialize api routes
    app.use("/api/v1", routes);

    //@initialize api not found middleware
    app.use("/*", (req, res, next)=>{
      res.status(404);
      return res.json({status: 404, message: messageConfig.ERR_API_NOT_FOUND})
    });

    // @initialize global error handler
    app.use((err, req, res, next)=>{
      console.log("err", err.stack)
      res.status(500);
      return res.json({status: 500, message: messageConfig.ERR_INTERNAL_SERVER});
    })

} catch (error) {
  console.log("system error can not start server");
  process.exit(1);
}



export default app;