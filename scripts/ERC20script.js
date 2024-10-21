const { computeAddress } = require("ethers");

async function main() {
  let Token;
  let erc20;
  let owner;
  let user1;
  let user2;
  Token = await ethers.getContractFactory("MyToken20");
  [owner, user1, user2] = await ethers.getSigners();

  const ctr = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  erc20 = await Token.attach(ctr);
  curBalance = await erc20.balanceOf(owner.address);
  console.log("Owner address: ", owner.address);
  console.log("User1 address: ", user1.address);
  console.log(user1.privateKey)
  console.log("----------------------------------");
  console.log("Initial owner balance:", curBalance);
  console.log("Initial user1 balance:", await erc20.balanceOf(user1.address));
  console.log("----------------------------------");
  await erc20.approve(owner.address, 100);
  await erc20.transfer(user1.address, 100);
  curBalance = await erc20.balanceOf(owner.address);
  console.log("Owner balance after transfer():", curBalance);
  console.log("User1 balance after transfer():", await erc20.balanceOf(user1.address));
  await erc20.approve(owner.address, 200)
  await erc20.transferFrom(owner.address, user1.address, 200)
  curBalance = await erc20.balanceOf(owner.address);
  console.log("Balance after transferFrom():", curBalance);
  
  await erc20.connect(user1).buy({ value: BigInt(10) });
  curBalance = await erc20.balanceOf(owner.address);
  console.log("Balance after buy():", curBalance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });