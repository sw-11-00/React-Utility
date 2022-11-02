import { ethers } from "ethers";
import erc20Abi from '../../abis/GenericErc20.json';

export let walletAddress;
let signer;
export let erc20Obj;
let uBalance;
let approveAmount; 

export function hasMetaMaskWalletExtension() {
    return window.ethereum;
}

export async function connectMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn");
        return;
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    walletAddress = accounts[0];

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let curSigner = provider.getSigner();
    signer = curSigner;

    let usdAddr = "0x827D24f4a545e26A877C17019a8D815D538f46A7";   //
    erc20Obj = new ethers.Contract(usdAddr, erc20Abi, curSigner);

    let balanceRes = await erc20Obj.balanceOf(walletAddress);
    uBalance = ethers.utils.formatUnits(balanceRes, 6);

    let allowRes = await erc20Obj.allowance(walletAddress, "0xC5F4696D8781A753937316883ECDb6423E415ADC");
    approveAmount = ethers.utils.formatUnits(allowRes, 6);
}