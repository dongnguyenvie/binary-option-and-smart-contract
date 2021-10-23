// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HHDPaymentProcessor {
    address public owner;
    IERC20 public hhd;

    event PaymentDone(
        address payer,
        uint256 amount,
        string userId,
        uint256 date
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor(address hhdAdrress) public {
        owner = msg.sender;
        hhd = IERC20(hhdAdrress);
    }

    function deposit(uint256 amount, string memory userId) external {
        require(amount > 0, "Amount must be bigger than 0");
        uint256 allowance = hhd.allowance(msg.sender, address(this));
        require(allowance >= amount, "Pls approve first");
        hhd.transferFrom(msg.sender, address(this), amount);
        emit PaymentDone(msg.sender, amount, userId, block.timestamp);
    }

    function withdraw() external onlyOwner {
        hhd.transfer(owner, hhd.balanceOf(address(this)));
    }
}
