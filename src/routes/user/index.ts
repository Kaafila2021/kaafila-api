const express = require('express');
const router = express.Router();

import myself from "./handlers/myself";
import updateUser from "./handlers/updateUser";


router
    .route('/myself')
    .get(myself)

router
    .route('/update')
    .post(updateUser)

export default router;

