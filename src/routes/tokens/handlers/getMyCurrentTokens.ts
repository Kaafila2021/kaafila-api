import handleError from "../../../helpers/handle-error";
import AdminRates from "../../admin-rates/schemas/AdminRates.schema";
import WalletVideoWatch from "../../sockets/schemas/wallet-video-watch.schema";

let currentRate: number;

try {
    (async () => {
        const adminRates = await AdminRates.findOne({ name: 'viewer_rate' }) as any;
        currentRate = +adminRates.rate;

        const currentRateId = adminRates._id;
        const currentRatesListener = AdminRates.watch();
        currentRatesListener.on('change', (change: any) => {
            if (change.documentKey._id.toString() === currentRateId.toString()) {
                currentRate = +change.updateDescription.updatedFields.rate
            }
        })
    })();
} catch (e) {
    console.log(e)
}

const getMyCurrentTokens = async (req, res) => {
    try {
        const currentWallet = req.body.wallet;
        const videoWatchDBObject = await WalletVideoWatch.find({ wallet: currentWallet, isRefunded: false }) as any;
        const totalTimeViewed = videoWatchDBObject?.reduce((acc, { timeViewed }) => acc + timeViewed, 0) || 0;
        const currentTokens = totalTimeViewed * currentRate;

        res
            .status(200)
            .json({ result: 'OK', currentTokens })
    } catch (err) {
        handleError(err, res)
    }

}

export default getMyCurrentTokens;