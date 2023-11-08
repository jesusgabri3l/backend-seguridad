import express from "express";
import { encrypt, decrypt } from "../controllers/crypto/cryptoController.js";

const cryptoRouter = express.Router();

cryptoRouter.post("/cipher", async (req, res) => {
    const response = await encrypt(req.body);
    res.json(response);
});

cryptoRouter.post("/decipher", async (req, res) => {
    const response = await decrypt(req.body);
    res.json(response);
});

export { cryptoRouter };
