import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "TODO_v1"
    }).then(() => {
        console.log("database connected")
    }).catch(e => {
        console.log("error connecting to database")
    })
}