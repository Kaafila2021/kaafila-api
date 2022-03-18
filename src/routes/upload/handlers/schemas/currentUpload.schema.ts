import { model, Schema } from "mongoose";

const CurrentlyFileUploadSchema = new Schema({
    fileId: String
}, { timestamps: true })

const CurrentlyFileUpload = model('currentlyFileUpload', CurrentlyFileUploadSchema)

export default CurrentlyFileUpload;