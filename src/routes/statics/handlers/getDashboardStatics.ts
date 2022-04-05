import handleError from "../../../helpers/handle-error";
import AdminRates from "../../../schemas/AdminRates.schema";
import FileUpload from "../../../schemas/fileUpload.schema";
import WalletVideoWatch from "../../../schemas/wallet-video-watch.schema";

let currentRate: number;

try {
    (async () => {
        const adminRates = await AdminRates.findOne({ name: 'creator_rate' }) as any;
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

const getDashboardStatics = async (req, res) => {
    try {
        const { userId } = req.params;

        const filesToSearch = await FileUpload.find({ user: userId }).select("_id");

        const videosData = await WalletVideoWatch.find()
            .where('currentFile')
            .in([...filesToSearch]) as any;

        const totalViews = videosData.length;
        const uniqViews = new Set();
        const uniqViewsSession = new Set();
        videosData.forEach(({ wallet, session }) => {
            uniqViews.add(wallet);
            uniqViewsSession.add(wallet + session);
        });
        const totalTimeView = videosData.length ? videosData.reduce((acc, val) => ({ timeViewed: acc.timeViewed + val.timeViewed })).timeViewed : 0;
        const tokensEarned = totalTimeView * currentRate;
        const avgTokensEarnedPerVideo = (totalTimeView / totalViews) * currentRate;

        const accountInfo = {
            accountType: 'normal'
        };

        const videosInfo = {
            totalViews,
            uniqViews: [...uniqViews.values()].length,
            uniqViewsSession: [...uniqViewsSession.values()].length,
            totalTimeView,
            avgTimeViewPerVideo: totalTimeView / totalViews,
            totalActiveVideos: filesToSearch.length
        };

        const tokensInfo = {
            tokensEarned,
            avgTokensEarnedPerVideo
        }

        res
            .status(200)
            .json({ accountInfo, videosInfo, tokensInfo })
    } catch (err) {
        handleError(err, res)
    }

}

export default getDashboardStatics;