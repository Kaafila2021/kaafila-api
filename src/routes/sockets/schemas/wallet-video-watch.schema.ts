import { model, Schema } from "mongoose";

const walletVideoWatchSchema = new Schema({
    wallet: String,
    userId: String,
    timePlayed: Number,
    timeViewed: Number,
    currentFile: {
        type: Schema.Types.ObjectId,
        ref: 'FileUpload'
    },
    duration: Number,
    isActive: Boolean,
    isRefunded: Boolean,
    dried: Boolean
}, { timestamps: true })

const WalletVideoWatch = model('WalletVideoWatch', walletVideoWatchSchema)

export default WalletVideoWatch;