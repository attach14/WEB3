const { ethers } = require("hardhat");
const { hexZeroPad } = require ("@ethersproject/bytes");
async function main() {
    try {
        ////ERC-20
        const Token = await ethers.getContractFactory("MyToken20");
        const ctr20 = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //token address
        const addr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; //my address
        const paddedAddress = hexZeroPad(addr, 32);
        const paddedBalanceSlot = hexZeroPad("0x00", 32);
        const storageSlot = ethers.keccak256(paddedAddress + paddedBalanceSlot.slice(2));
        console.log("Computed storage slot for balance for erc20 contract:", storageSlot);
        const balanceInStorage = await ethers.provider.getStorage(ctr20, storageSlot);
        console.log("My balance: ", ethers.toBigInt(balanceInStorage));

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();