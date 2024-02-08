export default {
  name: {
    type: "string",
    required: true
  },
  file: {
    type: "file",
    required: false
  },
  mbti: {
    type: "string", 
    required: true
  },
  zodiac: {
    type: "string",
    required: true
  },
  enneagram:{
    type: "string",
    required: true
  },
  title: {
    type: "string",
    required: true
  },
  description:{
    type: "string",
    required: false
  }
}