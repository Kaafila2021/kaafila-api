import videoWached from "./handlers/video-wached";

const express = require('express');
const router = express.Router();



router
    .route('/')
    .get(videoWached)

export default router;

