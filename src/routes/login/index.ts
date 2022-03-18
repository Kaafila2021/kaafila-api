const express = require('express');
const router = express.Router();

import login from "./handlers/login";


router
    .route('')
    .post(login)


export default router;

