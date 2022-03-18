import adminRates from "./handlers/admin-rates";
import modifyAdminRates from "./handlers/modify-admin-rates";

const express = require('express');
const router = express.Router();


router
    .route('/')
    .get(adminRates)
    .post(modifyAdminRates);

export default router;

