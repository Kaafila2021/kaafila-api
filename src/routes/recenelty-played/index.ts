const express = require('express');
const router = express.Router();

import recentlyPlayed from "./handlers/recently-played";
import removeRecentlyPlayed from "./handlers/remove-recently-played";

router
    .route('/:wallet')
    .get(recentlyPlayed)

    
router
    .route('/:wallet/:currentFile')
    .delete(removeRecentlyPlayed);

export default router;

