const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("MyToken1155 Contract", function () {
    let Token;
    let erc1155;
    let owner;
    let user1;
    let user2;
  
    beforeEach(async function () {
      Token = await ethers.getContractFactory("MyToken1155");
      [owner, user1, user2] = await ethers.getSigners();
      erc1155 = await Token.deploy(owner.address);
    });
    it("setURI() test", async function () {
      const newURI = "web3";
      await erc1155.setURI(newURI);
      await erc1155.mint(user1.address, 14, BigInt(14), "0x");
      const baseURI = await erc1155.uri(14);
      expect(baseURI).to.equal(newURI);
    });
  });