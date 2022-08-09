import { resolve } from 'path';
import os from 'os';
import crypto from 'crypto';
import multer from 'multer';

export const UPLOAD_DIR = os.tmpdir();

export default {

    upload(folder: string) {

        return {
            storage: multer.diskStorage({
                destination: resolve(UPLOAD_DIR, folder),
                filename(req, file, callback) {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                }
            })
        }
    }
}