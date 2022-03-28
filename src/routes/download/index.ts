const express = require('express');
const router = express.Router();

// import downloadFile from "./handlers/downloadFile";
import downloadFilesArtist from "./handlers/downloadFilesArtist";
import downloadVideoData from "./handlers/downloadVideoData";

router
    .route('/artist/:id')
    .get(downloadFilesArtist)

router
    .route('/artist-file/:id')
    .get(downloadFilesArtist)

router
    .route('/video-data/:fileHash')
    .get(downloadVideoData)

// Deprecated upload and download from front side
// router
//     .route('/file')
//     .get(downloadFile);

export default router;
