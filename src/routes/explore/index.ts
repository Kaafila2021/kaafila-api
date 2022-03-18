const express = require('express');
const router = express.Router();

import explore from "./handlers/explore";
import exploreArtists from "./handlers/explore-artists";

router
    .route('/')
    .get(explore);

router
    .route('/artists')
    .get(exploreArtists);

export default router;

