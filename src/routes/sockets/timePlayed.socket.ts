import AdminRates from "../admin-rates/schemas/AdminRates.schema";
import WalletVideoWatch from './schemas/wallet-video-watch.schema';

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

export default function timePlayedSocket(io, socket): void {
    let currentWallet: string;
    let currentFile: string;
    const videoWatch = {} as any;

    socket.on('timePlayed', async (data: { wallet: string, currentFileId: string, userId: string, duration: number }) => {
        currentWallet = data.wallet;
        currentFile = data.currentFileId;
        videoWatch[currentWallet] = {
            userId: data.userId,
            wallet: data.wallet,
            duration: data.duration,
            currentFile,
            timeViewed: 0,
            isActive: true,
            isRefunded: false,
            dried: false
        };

        if (currentWallet) {
            const videoWatchDBObject = await WalletVideoWatch.findOne({ wallet: currentWallet, currentFile: data.currentFileId }) as any;
            if (!videoWatchDBObject) {
                await new WalletVideoWatch(videoWatch[currentWallet]).save();
            } else {
                if (+videoWatchDBObject.duration <= +videoWatchDBObject.timeViewed) {
                    if (videoWatchDBObject.dried) return;
                    videoWatch[currentWallet].timeViewed = videoWatchDBObject.timeViewed;
                    videoWatch[currentWallet].dried = true;
                    await WalletVideoWatch.findOneAndUpdate({ wallet: currentWallet, currentFile: data.currentFileId }, videoWatch[currentWallet]);
                    return;
                };
                videoWatch[currentWallet].timeViewed = videoWatchDBObject.timeViewed + 1;
                await WalletVideoWatch.findOneAndUpdate({ wallet: currentWallet, currentFile: data.currentFileId }, videoWatch[currentWallet]);
            }
            io.emit(currentWallet, (1 * currentRate));
        }
    });


}