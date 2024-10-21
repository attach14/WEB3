const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken20 Contract", function () {
    let Token;
    let erc20;
    let owner;
    let user1;
    let user2;
  
    beforeEach(async function () {
      Token = await ethers.getContractFactory("MyToken20");
      [owner, user1, user2] = await ethers.getSigners();
      erc20 = await Token.deploy(owner.address);
    });
    it("transfer() test", async function () {
        const balance1before = await erc20.balanceOf(user1.address);
        await erc20.approve(owner.address, 100);
        await erc20.transfer(user1.address, 100);
        const balance1after = await erc20.balanceOf(user1.address);
        expect(balance1after).to.equal(balance1before + BigInt(90));
    });
    it("transferFrom() test", async function () {
        const balance1before = await erc20.balanceOf(owner.address);
        const balance2before = await erc20.balanceOf(user2.address);
        await erc20.approve(owner.address, 50)
        await erc20.transferFrom(owner.address, user2.address, 50);
        const balance1after = await erc20.balanceOf(owner.address);
        expect(balance1after).to.equal(balance1before - BigInt(50));
        const balance2after = await erc20.balanceOf(user2.address);
        expect(balance2after).to.equal(balance2before + BigInt(45));
    });
    it("buy() test #1", async function () {
      const ownerBalanceBefore = await erc20.balanceOf(owner.address);
      const userBalanceBefore = await erc20.balanceOf(user1.address);
      await erc20.connect(user1).buy({ value: BigInt(10) });
      const ownerBalanceAfter = await erc20.balanceOf(owner.address);
      const userBalanceAfter = await erc20.balanceOf(user1.address);
      expect(userBalanceAfter).to.equal(userBalanceBefore + BigInt(10));
      expect(ownerBalanceAfter).to.equal(ownerBalanceBefore - BigInt(10));
    })
    it("buy() test #2", async function () {
      await expect(erc20.connect(user1).buy({ value: BigInt(0) })).to.be.revertedWith("You need to send ether");
    });
    it("buy() test #3", async function () {
      const ownerBalanceBefore = await erc20.balanceOf(owner.address);
      await expect(erc20.connect(user1).buy({ value: ownerBalanceBefore + BigInt(1) })).to.be.revertedWith("Too big ether count");
    });
    it("transfer() without gas test", async function () {

    })
  });