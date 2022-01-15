import express from "express";
import path from "path";
import { getBirthday } from "../services/contract";
import { makeTokensOfOwnerJson, makeEmbrionData, setCorrectImgURL } from "../utils/makeData";
import fs from "fs";

const router = express.Router();

router.get("/nft/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const birthday = await getBirthday(id);

        if (birthday) {
            const isBirth = checkDate(birthday);

            if (!isBirth && birthday.toNumber() > 0) {
                res.json(makeEmbrionData(id));
            } else if (!isBirth) {
                res.json({ error: "not burn yet" });
            } else {
                const nftData = JSON.parse(fs.readFileSync(path.resolve(`./files/nft/${id}.json`), "utf8"));
                res.json(setCorrectImgURL(nftData));
            }
        } else {
            res.status(404).json({
                error: "That mule has not been make yet",
            });
        }
    } catch (err) {
        res.status(500);
        // console.error(err);
    }
});

router.get("/tokens/:wallet", async (req, res) => {
    res.json(await makeTokensOfOwnerJson(req.params.wallet));
});

export default router;

//  FUNCTIONS

function checkDate(birthday) {
    birthday = birthday.toNumber();
    if (birthday === 0) {
        return false;
    }

    const currentTime = Date.now() / 1000;

    return currentTime > birthday + 432000; // current time > birthday + one week
}
