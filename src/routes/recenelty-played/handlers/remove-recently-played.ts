import handleError from "../../../helpers/handle-error";
import WalletVideoWatch from '../../sockets/schemas/wallet-video-watch.schema';

const removeRecentlyPlayed = async (req, res) => {
    try {
        const { wallet, currentFile } = req.params;
        await WalletVideoWatch.updateMany({ wallet, currentFile }, { "$set": { "isActive": false } }, { "multi": true })

        res
            .status(200)
            .contentType("text/json")
            .json({ status: 'ok' });

    } catch (err) {
        handleError(err, res)
    }
}

export default removeRecentlyPlayed;