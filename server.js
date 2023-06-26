import { connectDB } from "./Data/database.js";
import { app } from "./app.js";

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})