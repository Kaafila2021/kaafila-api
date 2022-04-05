import handleError from "../../../helpers/handle-error";
import WalletVideoWatch from '../../../schemas/wallet-video-watch.schema';

const videoWached = async (req, res) => {

    try {
        const user = req.user;
        const videoWached = await WalletVideoWatch.find({ userId: user.id, dried: true }).select('currentFile');

        res
            .status(200)
            .contentType("text/json")
            .json({
                error: null,
                data: videoWached
            });

    } catch (err) {
        handleError(err, res)
    }
}

export default videoWached;