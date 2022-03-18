import { model, Schema } from "mongoose";

const packSchema = new Schema({
    user: String,
    transaction: String,
    uri: String,
    pack_id: String
}, { timestamps: true })

const Pack = model('Pack', packSchema)

export default Pack;