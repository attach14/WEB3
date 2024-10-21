const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("MyToken721 Contract", function () {
    let Token;
    let erc721;
    let owner;
    let user1;
    let user2;
  
    beforeEach(async function () {
      Token = await ethers.getContractFactory("MyToken721");
      [owner, user1, user2] = await ethers.getSigners();
      erc721 = await Token.deploy(owner.address);
    });
    it("setURI() test", async function () {
      const newURI = "web3";
      await erc721.setURI(newURI);
      await erc721.safeMint(user1.address, 14); 
      const baseURI = await erc721.tokenURI(14);
      expect(baseURI).to.equal(newURI + "14");
    });
  });