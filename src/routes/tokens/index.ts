const express = require('express');
const router = express.Router();

import endCurrentTokensWithrawalProcess from "./handlers/endCurrentTokensWithrawalProcess";
import endMyRefererRewardProcess from "./handlers/endMyRefererRewardProcess";
import getMyCurrentTokens from "./handlers/getMyCurrentTokens";
import getMyRefererRewards from "./handlers/getMyRefererRewards";
import getMyTokens from "./handlers/getMyTokens";

router
    .route('/get-my-tokens')
    .post(getMyTokens);

router
    .route('/get-current-tokens')
    .post(getMyCurrentTokens)

router
    .route('/get-referer-rewards')
    .post(getMyRefererRewards)

router
    .route('/end-current-tokens/:wallet')
    .get(endCurrentTokensWithrawalProcess)

router
    .route('/end-referer-rewards')
    .get(endMyRefererRewardProcess)


export default router;
