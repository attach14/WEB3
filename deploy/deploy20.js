async function main() {
    Token = await ethers.getContractFactory("MyToken20");
    [owner, user1, user2] = await ethers.getSigners();
    erc20 = await Token.deploy(owner.address);
    console.log("erc20 address:", await erc20.getAddress());

    Token = await ethers.getContractFactory("MyToken721");
    [owner, user1, user2] = await ethers.getSigners();
    erc721 = await Token.deploy(owner.address);
    console.log("erc721 address:", await erc721.getAddress());

    Token = await ethers.getContractFactory("MyToken1155");
    [owner, user1, user2] = await ethers.getSigners();
    erc1155 = await Token.deploy(owner.address);
    console.log("erc1155 address:", await erc1155.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });