import ejs from "ejs"
import fs from "fs";

import path from "path";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildTemplate = (profileObj) => {

  function getBookingTemplate(_dir) {
      return fs.readFileSync(path.join(__dirname, _dir), 'utf-8');
  }

  return ejs.render(getBookingTemplate('../templates/profile-template.ejs'), {
    userName: profileObj.name,
  })
}

export default buildTemplate;