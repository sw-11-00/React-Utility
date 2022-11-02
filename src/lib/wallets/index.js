import { ethers } from "ethers";
import erc20Abi from '../../abis/GenericErc20.json';

export let walletAddress;
export let erc20Obj;

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

    let usdAddr = "0x827D24f4a545e26A877C17019a8D815D538f46A7";   //
    erc20Obj = new ethers.Contract(usdAddr, erc20Abi, curSigner);
}