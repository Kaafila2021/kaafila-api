const express = require('express');
const router = express.Router();

import getDashboardStatics from "./handlers/getDashboardStatics";

router
    .route('/:userId')
    .get(getDashboardStatics);


export default router;
