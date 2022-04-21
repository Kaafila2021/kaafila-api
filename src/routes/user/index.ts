const express = require('express');
const router = express.Router();

import myself from "./handlers/myself";
import updateUser from "./handlers/updateUser";
import userReferer from "./handlers/userReferers";


router
    .route('/myself')
    .get(myself)

router
    .route('/update')
    .post(updateUser)

router
    .route('/user-referers/:userId')
    .get(userReferer)

export default router;

