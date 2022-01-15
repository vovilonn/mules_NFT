import { getTokensOfOwner } from "../services/contract";
import config from "../../config.json";
import fs from "fs";
import path from "path";

export function makeEmbrionData(nftId) {
    return {
        image: `${config.ROOT_URL}images/embrion/embrion.jpg`,
        external_url: config.ROOT_URL + `nft/${nftId}`,
        attributes: [
            {
                value: "empty",
                trait_type: "None",
            },
        ],
        name: "empty",
    };
}

export async function makeTokensOfOwnerJson(wallet) {
    const tokensID = await getTokensOfOwner(wallet);
    return tokensID.map((id) => fs.readFileSync(path.resolve(`./files/nft/${id}.json`)));
}

export function setCorrectImgURL(nftData) {
    return { ...nftData, image: `${config.ROOT_URL}images/nft/${nftData.edition}.png` };
}
