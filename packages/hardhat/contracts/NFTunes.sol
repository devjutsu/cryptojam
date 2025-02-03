// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTunes is ERC721Enumerable, ERC721URIStorage, Ownable {
    
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => mapping(address => Stake)) public stakes; // NFT ID -> User -> Stake
    mapping(uint256 => uint256) public totalStaked; // NFT ID -> Total Staked Amount
    address public beatCoinContract;

    event Staked(address indexed user, uint256 indexed nftId, uint256 amount);
    event Unstaked(address indexed user, uint256 indexed nftId, uint256 amount);
    event RewardDistributed(uint256 indexed nftId, uint256 totalReward);

    constructor(address _beatCoinContract) ERC721("NFTunes", "NFTN") Ownable(msg.sender) {
        beatCoinContract = _beatCoinContract;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://nftunes-metadata.io/";
    }

    function mintNFT(address to, uint256 tokenId, string memory tokenURI) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function stake(uint256 nftId, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        ERC20 beatCoin = ERC20(beatCoinContract);
        require(beatCoin.balanceOf(msg.sender) >= amount, "Insufficient balance");
        beatCoin.transferFrom(msg.sender, address(this), amount);

        stakes[nftId][msg.sender] = Stake(amount, block.timestamp);
        totalStaked[nftId] += amount;
        emit Staked(msg.sender, nftId, amount);
    }

    function distributeRewards(uint256 nftId, uint256 totalTransactionValue) external onlyOwner {
        uint256 rewardPool = totalTransactionValue / 10; // 10% от транзакции идёт стейкерам
        require(totalStaked[nftId] > 0, "No stakes for this NFT");
        ERC20 beatCoin = ERC20(beatCoinContract);

        for (uint i = 0; i < totalSupply(); i++) {
            address staker = ownerOf(i);
            uint256 stakeAmount = stakes[nftId][staker].amount;
            uint256 reward = (stakeAmount * rewardPool) / totalStaked[nftId];
            beatCoin.transfer(staker, reward);
        }
        emit RewardDistributed(nftId, rewardPool);
    }

    function unstake(uint256 nftId) external {
        require(stakes[nftId][msg.sender].amount > 0, "No stake found for this NFT");
        uint256 stakedAmount = stakes[nftId][msg.sender].amount;
        delete stakes[nftId][msg.sender];
        totalStaked[nftId] -= stakedAmount;
        ERC20 beatCoin = ERC20(beatCoinContract);
        beatCoin.transfer(msg.sender, stakedAmount);
        emit Unstaked(msg.sender, nftId, stakedAmount);
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        super._update(to, tokenId, auth);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
