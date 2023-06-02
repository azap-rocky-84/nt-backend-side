import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Il server va... non mi rompere i coglioni");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Il server va sulla porta ${PORT}`));