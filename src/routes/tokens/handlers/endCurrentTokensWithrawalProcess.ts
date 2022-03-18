import handleError from "../../../helpers/handle-error";
import WalletVideoWatch from "../../sockets/schemas/wallet-video-watch.schema";


const endCurrentTokensWithrawalProcess = async (req, res) => {
    try {
        const { wallet } = req.params;
        await WalletVideoWatch.updateMany({ wallet, isRefunded: false }, { "$set": { "isRefunded": true } }, { "multi": true })

        res
            .status(200)
            .contentType("text/json")
            .json({ status: 'ok' });
    } catch (err) {
        handleError(err, res)
    }

}

export default endCurrentTokensWithrawalProcess;