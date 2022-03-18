const express = require('express');
const router = express.Router();

import passwordEmail from "./handlers/passwordEmail";
import passwordReset from "./handlers/passwordReset";


router
    .route('/')
    .post(passwordEmail)

router
    .route('/:userId/:token')
    .post(passwordReset)

export default router;

