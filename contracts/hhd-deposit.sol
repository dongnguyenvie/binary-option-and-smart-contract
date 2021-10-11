// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract HHDPaymentProcessor {
    address public owner;
    IERC20 public hhd;

    event PaymentDone(
        address payer,
        uint256 amount,
        uint256 paymentId,
        uint256 date
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor(address adminAddress, address daiAddress) public {
        owner = msg.sender;
        hhd = IERC20(daiAddress);
    }

    function pay(uint256 amount, uint256 paymentId) external {
        hhd.transferFrom(msg.sender, address(this), amount);
        emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
    }

    function withdraw() external onlyOwner {
        hhd.transfer(owner, hhd.balanceOf(address(this)));
    }
}
