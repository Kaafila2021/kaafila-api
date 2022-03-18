const express = require('express');
const router = express.Router();

import register from "./handlers/register";


router
    .route('')
    .post(register)


export default router;

