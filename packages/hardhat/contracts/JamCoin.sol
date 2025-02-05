// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JamCoin is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("JamCoin", "XJAM") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

// добавить покупку токенов за эфир
// добавить растущую цену, продумать динамику роста
