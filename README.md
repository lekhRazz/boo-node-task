## BOO-coding-test

## stack used
1. text type : Node.js
2. Database: Mongodb

## How to start server: 
1. copy and make .env file with this command
```
cp .env.sample .env
```
2. install node modules with this command
```
npm i
```
3. run server with this command
```
npm run dev
```

## how to run test
* To run test hit this command 
```
npm run test
```


## API end points
#### create profile API 
* API: http://localhost:3000/api/v1/profile/upload
* Method: POST
* content-type: multipart/form-data
* Payload: 
```
 {
  name: "Ali",
  file: IMAGE
 }
```

#### get profile by id
* API: http://localhost:3000/api/v1/profile/info/${profileId}
* Method: GET


#### create comment
* API: http://localhost:3000/api/v1/comment/create
* Method: POST
* content-type: application/json
* Payload: 
```
 {
    "name":"lekhraj",
    "file":"myimage.jpg",
    "mbti": "infp",
    "zodiac": "gemini",
    "enneagram":"1w2",
    "title":"this is title",
    "description":"this is description"
 }
```

#### list comments 
* API: http://localhost:3000/api/v1/comment/list?filter[zodiac]=gemini&page=1&perpage=2&filter[mbti]=infp&sort=best
* Method: Get

#### like comment
* API: http://localhost:3000/api/v1/comment/like/${commentId}
* Method: PUT

#### vote comment
* API: http://localhost:3000/api/v1/comment/vote/${commentID}
* Method: PUT
* content-type: application/json
* payload: 
```
{
    "mbti": "INFP",
    "zodiac": "Gemini",
    "enneagram":"1w2"
}
```