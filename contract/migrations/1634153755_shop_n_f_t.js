const MarioGame = artifacts.require("MarioGame");
const HHDCoin = artifacts.require("HHD");
const HHDFaucet = artifacts.require("HHDFaucet");
const HHDPaymentProcessor = artifacts.require("HHDPaymentProcessor");

module.exports = function (deployer) {
  deployer.then(async () => {
    // deploy marial
    await deployer.deploy(MarioGame, "MarioGame", "MARIO");
    
    await deployer.deploy(HHDCoin, "HHD premium", "hhd", 999999);
    await deployer.deploy(HHDPaymentProcessor, HHDCoin.address);
    await deployer.deploy(HHDFaucet, HHDCoin.address);
  });
};
