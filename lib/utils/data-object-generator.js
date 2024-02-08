'use strict';
import { v4 } from "uuid";


class DataBuilder {

  save(data, dataModel){
    let _returnData = {
      _id: v4(),
      createdAt: new Date(),
      deleted: false
    };

    for(let item of Object.keys(dataModel)){
      _returnData[item] = data[item]
    }
    return _returnData;
  }

  update(){

  }
}

export default new DataBuilder();