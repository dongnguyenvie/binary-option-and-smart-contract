// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// chuyen tien vao token HHD =>  HHD_Faucet
// HHD_Faucet(anh) => token_HHD(ngan hang) => token_HHD.tranfer(B, sotien)
contract HHDFaucet {
    IERC20 public token_HHD;

    constructor(address Token) {
        token_HHD = IERC20(Token);
    }

    function getFreeToken() public {
        token_HHD.transfer(msg.sender, 0.01 * 1e18);
    }
}
