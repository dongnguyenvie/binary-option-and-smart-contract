const ShopNFT = artifacts.require("ShopNFT");

module.exports = function (deployer) {
  deployer.deploy(ShopNFT, "HHD SHOP", "hhdnft");
};
