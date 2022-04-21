import handleError from "../../../helpers/handle-error";
import Referer from "../../../schemas/Referer.schema";
const ObjectId = require('mongoose').Types.ObjectId;


const endMyRefererRewardProcess = async (req, res) => {
    try {
        await Referer.updateMany({
            $or: [
                { $and: [{ referedBy: new ObjectId(req.user.id) }, { referedByRewardsClaimed: false }] },
            ]
        }, { "$set": { "referedByRewardsClaimed": true } }, { "multi": true })
        await Referer.updateMany({
            $or: [
                { $and: [{ referer: new ObjectId(req.user.id) }, { refererRewardsClaimed: false }] }
            ]
        }, { "$set": { "refererRewardsClaimed": true } }, { "multi": true })

        res
            .status(200)
            .contentType("text/json")
            .json({ status: 'ok' });
    } catch (err) {
        handleError(err, res)
    }

}

export default endMyRefererRewardProcess;