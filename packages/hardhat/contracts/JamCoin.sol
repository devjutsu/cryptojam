// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JamCoin is ERC20, Ownable {
    uint256 public pricePerToken = 0.0005 ether;
    uint256 public priceGrowthFactor = 10000000; // Коэффициент роста цены (можно корректировать)

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 totalCost);
    event EtherWithdrawn(address indexed owner, uint256 amount);

    constructor(uint256 initialSupply) ERC20("JamCoin", "XJAM") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function buyTokens() public payable {
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 amountToMint = msg.value / pricePerToken;
        require(amountToMint > 0, "Not enough ETH to buy at least 1 token");

        // Механизм роста цены
        pricePerToken += (amountToMint * pricePerToken) / priceGrowthFactor;

        _mint(msg.sender, amountToMint * 10 ** decimals());

        emit TokensPurchased(msg.sender, amountToMint, msg.value);
    }

    function withdrawEther() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Transfer failed");

        emit EtherWithdrawn(owner(), balance);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getCurrentPrice() external view returns (uint256) {
        return pricePerToken;
    }

    receive() external payable {
        buyTokens();
    }
}
