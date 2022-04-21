import { model, Schema } from "mongoose";

const refererSchema = new Schema({
    referer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    referedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    refererRewardsClaimed: {
        type: Boolean,
        default: false
    },
    referedByRewardsClaimed: {
        type: Boolean,
        default: false
    },
    user_refered_activated: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Referer = model('Referer', refererSchema)

export default Referer;