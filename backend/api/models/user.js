import mongoose from "mongoose";
import passportLocalMogoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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

const options = {
    usernameField: "email",
}

userSchema.plugin(passportLocalMogoose, options);

export default mongoose.model('User', userSchema);