const express = require('express');
const router = express.Router();

import buyPack from "./handlers/buy-pack";

router
    .route('/buy')
    .post(buyPack);

export default router;

