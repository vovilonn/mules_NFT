import { ethers } from "ethers";
import ABI from "../utils/abi.json";
import config from "../../config.json";

const contract = process.env.DEV ? config.contract.testnet : config.contract.mainnet;

console.log(contract.provider);

const provider = new ethers.providers.JsonRpcProvider(contract.provider);

const contractInstance = new ethers.Contract(contract.main, ABI, provider);

export const getBirthday = async (id) => {
    try {
        const birthday = await contractInstance.getBirthday(id);
        return birthday;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const getTokensOfOwner = async (wallet: string) => {
    try {
        return await contractInstance.tokensOfOwner(wallet);
    } catch (err) {
        console.error(err);
    }
}; // []: number
