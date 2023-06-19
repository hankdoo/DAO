const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
describe("Auction", function () {
  async function deploySeedWalletFixture() {
    const [owner, account1] = await ethers.getSigners();

    //WINDAO
    const WinDAO = await ethers.getContractFactory("WINDAO");
    const windao = await WinDAO.deploy();
    const windaoAddress = await windao.getAddress();
    //BUSD
    const CROWN = await ethers.getContractFactory("CrownNFT");
    const crown = await CROWN.deploy();
    const crownAddress = await crown.getAddress();
    //AUCTION
    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy(crownAddress, windaoAddress);
    return { auction, windao, crown, owner, account1 };
  }

  let owner, account1, windao, crown, auction;
  beforeEach(async () => {
    [owner, account1] = await ethers.getSigners();
    //WINDAO
    const WinDAO = await ethers.getContractFactory("WINDAO");
    windao = await WinDAO.deploy();
    const windaoAddress = await windao.getAddress();
    //BUSD
    const CROWN = await ethers.getContractFactory("CrownNFT");
    crown = await CROWN.deploy();
    const crownAddress = await crown.getAddress();
    //AUCTION
    const Auction = await ethers.getContractFactory("Auction");
    auction = await Auction.deploy(crownAddress, windaoAddress);
  });
  it("Should auction ", async function () {
    await crown.mint(owner.address);
    await crown.safeTransferFrom(owner.address, account1.address, 1);
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const amountToCreateAuction = 500 * 10 ** 3
    const tokenId=1;
    const crownAddress = await auction.getAddress()
    console.log(account1.address);

    await crown.connect(account1).approve(crownAddress,tokenId)
    await auction
      .connect(account1)
      .createAuction(
        tokenId,
        amountToCreateAuction,
        currentTimeStamp + 60,
        currentTimeStamp + 120
      );
    // console.log(await auction.auctions());
  });
  //   describe("Withdrawals", function () {
  //     describe("Validations", function () {
  //       it("Should revert with the right error if called too soon", async function () {
  //         const { lock } = await loadFixture(deployOneYearLockFixture);

  //         await expect(lock.withdraw()).to.be.revertedWith(
  //           "You can't withdraw yet"
  //         );
  //       });

  //       it("Should revert with the right error if called from another account", async function () {
  //         const { lock, unlockTime, otherAccount } = await loadFixture(
  //           deployOneYearLockFixture
  //         );

  //         // We can increase the time in Hardhat Network
  //         await time.increaseTo(unlockTime);

  //         // We use lock.connect() to send a transaction from another account
  //         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //           "You aren't the owner"
  //         );
  //       });

  //       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //         const { lock, unlockTime } = await loadFixture(
  //           deployOneYearLockFixture
  //         );

  //         // Transactions are sent using the first signer by default
  //         await time.increaseTo(unlockTime);

  //         await expect(lock.withdraw()).not.to.be.reverted;
  //       });
  //     });

  //     describe("Events", function () {
  //       it("Should emit an event on withdrawals", async function () {
  //         const { lock, unlockTime, lockedAmount } = await loadFixture(
  //           deployOneYearLockFixture
  //         );

  //         await time.increaseTo(unlockTime);

  //         await expect(lock.withdraw())
  //           .to.emit(lock, "Withdrawal")
  //           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //       });
  //     });

  //     describe("Transfers", function () {
  //       it("Should transfer the funds to the owner", async function () {
  //         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //           deployOneYearLockFixture
  //         );

  //         await time.increaseTo(unlockTime);

  //         await expect(lock.withdraw()).to.changeEtherBalances(
  //           [owner, lock],
  //           [lockedAmount, -lockedAmount]
  //         );
  //       });
  //     });
  //   });
});
