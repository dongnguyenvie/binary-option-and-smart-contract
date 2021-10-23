// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HHDPaymentProcessor {
    address public _owner;
    IERC20 private _hhd;
    uint256 _ratio = 2;

    event PaymentDone(
        address payer,
        uint256 amount,
        string userId,
        uint256 date
    );

    modifier onlyOwner() {
        require(msg.sender == _owner, "only _owner");
        _;
    }

    constructor(address hhdCoin) {
        _owner = msg.sender;
        _hhd = IERC20(hhdCoin);
    }

    function deposit(uint256 amount, string memory userId) external {
        require(amount > 0, "Amount must be bigger than 0");
        uint256 allowance = _hhd.balanceOf(msg.sender);
        require(allowance >= amount, "out of money");
        _hhd.transfer(address(this), amount);
        emit PaymentDone(msg.sender, amount, userId, block.timestamp);
    }

    function buyToken() public payable {
        require(msg.value > 0, "Amount must be bigger than 0");
        uint256 amount = msg.value * _ratio;
        uint256 balanOfCon = _hhd.balanceOf(address(this));
        require(balanOfCon >= amount, "Maybe the contract is out of money");
        // payable(address(this)).transfer(msg.sender.balance);
        _hhd.transfer(msg.sender, amount);
    }

    function withdraw() external onlyOwner {
        _hhd.transfer(_owner, _hhd.balanceOf(address(this)));
    }

    function withdrawETH() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
