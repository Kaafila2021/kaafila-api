const express = require('express');
const router = express.Router();

import categories from "./handlers/categories";

router
    .route('/list')
    .get(categories);

export default router;

