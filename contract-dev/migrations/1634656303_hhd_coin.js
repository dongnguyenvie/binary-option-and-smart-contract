const HHDCoin = artifacts.require("HHD");
const HHDFaucet = artifacts.require("HHDFaucet");
const HHDPaymentProcessor = artifacts.require("HHDPaymentProcessor");

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(HHDCoin, "HHD premium", "hhd", 999999);
    await deployer.deploy(HHDPaymentProcessor, HHDCoin.address);
    await deployer.deploy(HHDFaucet, HHDCoin.address);
  });
};
