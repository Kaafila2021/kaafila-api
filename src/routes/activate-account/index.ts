const express = require('express');
const router = express.Router();

import activateAccount from "./handlers/activateAccount";
import confirmationEmail from "./handlers/confirmationEmail";



router
    .route('/')
    .post(confirmationEmail)

router
    .route('/:userId/:token')
    .get(activateAccount)

export default router;

