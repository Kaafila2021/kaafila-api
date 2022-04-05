import { model, Schema } from "mongoose";

const FileUploadSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    transaction: String,
    uri: String,
    confirmed_txn_note: {
        hash: String,
        hashV0: String
    },
    file_id: String,
    file_preview: String,
    form_data: {
        description: String,
        album: String,
        music_file: String,
        title: String,
        category_id: [String],
        category: [{
            type: Schema.Types.ObjectId,
            ref: 'Categories'
        }]
    },
    cover: String,
    upload_date: {
        type: Date,
        default: Date.now
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const FileUpload = model('FileUpload', FileUploadSchema)

export default FileUpload;