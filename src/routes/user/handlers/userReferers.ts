import handleError from "../../../helpers/handle-error";
import Referer from "../../../schemas/Referer.schema";
require('dotenv').config();
const ObjectId = require('mongoose').Types.ObjectId;

async function userReferer(req, res) {
    (async () => {
        try {

            const referer = await Referer.find({
                $or: [
                    { $and: [{ referedBy: new ObjectId(req.params.userId) }, { referedByRewardsClaimed: false }] },
                    { referer: new ObjectId(req.params.userId) }
                ]
            });

            res
                .status(200)
                .contentType("text/json")
                .json({
                    error: null,
                    data: referer
                });

        } catch (err) {
            handleError(err, res);
        }
    })();
}

export default userReferer;