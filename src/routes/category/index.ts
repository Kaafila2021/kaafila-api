const express = require('express');
const router = express.Router();

import categoryTopVideos from "./handlers/category-top-videos";
import categoryVideos from "./handlers/category-videos";

router
    .route('/top-videos/:categoryId')
    .get(categoryTopVideos);

router
    .route('/:categoryId')
    .get(categoryVideos);

export default router;

