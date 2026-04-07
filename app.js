import express from "express"
import { sessionRouter } from "./src/routes/session.router.js";
import { connectDB } from "./src/config/db.js";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/session", sessionRouter)

app.listen(port, () => {
    connectDB();
    console.log(`app listening on port ${port}`);
});