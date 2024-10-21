async function main() {
    let Token;
    let erc1155;
    let owner;
    let user1;
    let user2;
    Token = await ethers.getContractFactory("MyToken1155");
    [owner, user1, user2] = await ethers.getSigners();
  
    const ctr = "0x70e0bA845a1A0F2DA3359C97E0285013525FFC49";
    erc1155 = await Token.attach(ctr);
    const newURI = "web3";
    await erc1155.setURI(newURI);
    await erc1155.mint(user1.address, 14, BigInt(14), "0x");
    const baseURI = await erc1155.uri(14);
    console.log("URI: ", baseURI);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });