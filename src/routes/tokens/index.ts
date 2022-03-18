const express = require('express');
const router = express.Router();

import endCurrentTokensWithrawalProcess from "./handlers/endCurrentTokensWithrawalProcess";
import getMyCurrentTokens from "./handlers/getMyCurrentTokens";
import getMyTokens from "./handlers/getMyTokens";

router
    .route('/get-my-tokens')
    .post(getMyTokens);

router
    .route('/get-current-tokens')
    .post(getMyCurrentTokens)

router
    .route('/end-current-tokens/:wallet')
    .get(endCurrentTokensWithrawalProcess)


export default router;
