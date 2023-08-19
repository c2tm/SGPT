import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subscribed: {
        type: Number,
        default: 0
    },
    subscribeDate: {
        type: Date,
        default: null,
    }
})

export default mongoose.model('User', userSchema);