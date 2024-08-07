import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
const { Schema } = mongoose


const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },

})

UserSchema.plugin(passportLocalMongoose)//this will automatically add username and password field for you

export const User = mongoose.model("User", UserSchema)