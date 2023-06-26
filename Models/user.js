import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: [true, "the user already exists"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        selected: false,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const User = mongoose.model("user", schema);