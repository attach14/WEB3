async function main() {
    let Token;
    let erc721;
    let owner;
    let user1;
    let user2;
    Token = await ethers.getContractFactory("MyToken721");
    [owner, user1, user2] = await ethers.getSigners();
  
    const ctr = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";
    erc721 = await Token.attach(ctr);

    const newURI = "web3";
    await erc721.setURI(newURI);
    await erc721.safeMint(user1.address, 14);
    console.log("User address: ", user1.address);
    const baseURI = await erc721.tokenURI(14);
    console.log("URI after safeMint(address, 14): ", baseURI);

    await erc721.connect(user1).approve(user2.address, 14);
    await erc721.connect(user2)["safeTransferFrom(address,address,uint256)"](user1.address, user2.address, 14);
    console.log("safeTransferFrom done");

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });