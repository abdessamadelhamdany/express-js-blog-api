import fs from 'fs';
import mime from 'mime';
import multer from 'multer';
import * as dateFn from 'date-fns';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    filename(_, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + mime.extension(file.mimetype));
    },

    destination(_, __, cb) {
      const today = dateFn.format(Date.now(), 'dd-MM-Y');
      const dest = `static/media-library/${today}`;

      const destPath = path.join(process.cwd(), dest);
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }

      cb(null, dest);
    },
  }),
});

const localProvider = {
  single: (fieldName: string) => upload.single(fieldName),
  array: (fieldname: string, maxCount: number = 24) => upload.array(fieldname, maxCount),
};

export default localProvider;
