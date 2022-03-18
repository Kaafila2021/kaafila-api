const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer({
    dest: "uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

import uploadDBSync from "./handlers/uploadDBSync";
import uploadCover from "./handlers/uploadCover";
import deactivateVideo from "./handlers/disableVideo";
import updateVideo from "./handlers/updateVideo";
// import pinFile from './handlers/pinFile';
// import uploadIPFSAlgo from "./handlers/uploadIPFSAlgo";

// Deprecated upload and download from front side
// router
//     .route('/')
//     .post(uploadIPFSAlgo);

router
    .route('/db-sync')
    .post(uploadDBSync)

router
    .route('/db-sync-cover')
    .post(upload.single("cover"), uploadCover)

router
    .route('/deactivate-video')
    .post(deactivateVideo)

router
    .route('/update-video')
    .post(updateVideo)



// router
//     .route('/pin')
//     .post(pinFile)

router
    .route('/db-sync')
    .post(uploadDBSync)

export default router;

