import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    phone: {
        type: String,
        required: true,
        minLength: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String
    },
    summary: {
        type: String,
        maxLength: 300
    },
    work_experience: [{
        type: String,
        maxLength: 50
    }],
    education: [{
        type: String,
        maxLength: 50
    }],
    accomplishments: [String],
    creations: [String],
    profile_image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1598257733238-97cf162c5ae0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
    },
    profile_banner: {
        type: String,
        default: 'https://images.unsplash.com/photo-1614850715776-a749a85b4144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    }
}, { timestamps: true })

const User = model('User', userSchema)

export default User;