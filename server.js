import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import { errorResponserHandler, invalidPathHandler } from "./middleware/errorHandler";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Il server va...");
});
app.use('/api/users', userRoutes);
app.use(invalidPathHandler);
app.use(errorResponserHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Il server va sulla porta ${PORT}`));