import { model, Schema } from "mongoose";

const administrationSchema = new Schema({
    name: String,
    rate: String
}, { timestamps: true })

const AdminRates = model('AdminRates', administrationSchema)

export default AdminRates;