import * as fs from 'fs';
import * as path from 'path';

export const clearFile = (filePath) => {
  filePath = path.join(__dirname, '..', '..', '..', `uploads/${filePath}`);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
