import handleError from "../../../helpers/handle-error";
import WalletVideoWatch from '../../../schemas/wallet-video-watch.schema';

const recentlyPlayed = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const PAGE_SIZE = 20;
        const skip = (page - 1) * PAGE_SIZE;

        const { wallet } = req.params;
        const fiveDaysAgo = new Date(new Date().setDate(new Date().getDate() - 5));
        const recentlyPlayed = await WalletVideoWatch.find({
            wallet,
            updatedAt: {
                $gte: fiveDaysAgo,
                $lt: new Date()
            },
            isActive: true
        })
            .skip(skip)
            .limit(PAGE_SIZE)
            .populate('currentFile')
            .populate('user') as any;

        const filteredRecentlyPlayed = recentlyPlayed
            .reverse()
            .filter((v, i, a) => a.findIndex(t => (t.currentFile._id === v.currentFile._id)) === i);

        res
            .status(200)
            .contentType("text/json")
            .json({ recentlyPlayed: filteredRecentlyPlayed, totalItems: filteredRecentlyPlayed.length });

    } catch (err) {
        handleError(err, res)
    }
}

export default recentlyPlayed;