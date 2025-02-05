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
    mapping(uint256 => uint256) public nftRanking; // NFT ID -> рейтинг
    mapping(uint256 => uint256) public remixOf; // Remix NFT ID -> Original NFT ID
    mapping(string => bool) public inviteCodes;
    mapping(address => bool) public operators;
    mapping(uint256 => uint256[]) public ancestors; // NFT ID -> массив всех предков

    event Staked(address indexed user, uint256 indexed nftId, uint256 amount);
    event Unstaked(address indexed user, uint256 indexed nftId, uint256 amount);
    event RewardDistributed(uint256 indexed nftId, uint256 totalReward);
    event NFTuneCreated(address indexed creator, uint256 indexed tokenId);
    event RemixCreated(address indexed user, uint256 indexed newId, uint256 indexed originalId);

    constructor(address _beatCoinContract) ERC721("NFTunes", "NFTUNES") Ownable(msg.sender) {
        beatCoinContract = _beatCoinContract;
    }

    modifier onlyOperator() {
        require(operators[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    function setOperator(address _operator, bool _status) external onlyOwner {
        operators[_operator] = _status;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://meta.cryptojam.club/";
    }

    function addInviteCode(string memory code) external onlyOperator {
        inviteCodes[code] = true;
    }

    function mintNFT(uint256 tokenId, string memory uri, string memory code) public {
        ERC20 beatCoin = ERC20(beatCoinContract);
        uint256 mintCost = 1 * 10 ** 18; // 1 BeatCoin

        if (!inviteCodes[code]) {
            require(beatCoin.balanceOf(msg.sender) >= mintCost, "Insufficient BeatCoin balance");
            beatCoin.transferFrom(msg.sender, address(this), mintCost); // 1 BeatCoin уходит платформе (сжигается)
        } else {
            inviteCodes[code] = false; // Убираем бесплатный минт
        }

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTuneCreated(msg.sender, tokenId);
    }

    function mintRemix(uint256 originalId, uint256 newId, string memory uri) public {
        require(_exists(originalId), "Original NFT does not exist");

        ERC20 beatCoin = ERC20(beatCoinContract);
        uint256 remixCost = 1 * 10 ** 18;

        require(beatCoin.balanceOf(msg.sender) >= remixCost, "Insufficient BeatCoin balance");
        beatCoin.transferFrom(msg.sender, address(this), remixCost);

        _safeMint(msg.sender, newId);
        _setTokenURI(newId, uri);

        // Копируем всех предков + добавляем оригинальный NFT
        ancestors[newId] = ancestors[originalId]; // Наследуем предков
        ancestors[newId].push(originalId); // Добавляем текущего родителя

        emit RemixCreated(msg.sender, newId, originalId);
        emit NFTuneCreated(msg.sender, newId);
    }

    function stake(uint256 nftId, uint256 amount) external {
        require(amount == 1 * 10 ** 18, "Must stake exactly 1 BeatCoin");
        require(stakes[nftId][msg.sender].amount == 0, "Already staked");

        ERC20 beatCoin = ERC20(beatCoinContract);
        require(beatCoin.balanceOf(msg.sender) >= amount, "Insufficient balance");
        beatCoin.transferFrom(msg.sender, address(this), amount);

        stakes[nftId][msg.sender] = Stake(amount, block.timestamp);
        totalStaked[nftId] += amount;
        nftRanking[nftId] += 1; // Увеличиваем рейтинг NFT
        emit Staked(msg.sender, nftId, amount);
    }

    function distributeRewards(uint256 nftId, uint256 totalTransactionValue) external onlyOperator {
        require(totalStaked[nftId] > 0, "No stakes for this NFT");

        ERC20 beatCoin = ERC20(beatCoinContract);

        uint256 platformFee = totalTransactionValue / 10;
        uint256 stakingRewardPool = totalTransactionValue / 10;
        uint256 ownersReward = totalTransactionValue - (platformFee + stakingRewardPool);

        // 1. Сжигаем 10%
        beatCoin.transfer(address(0), platformFee);

        // 2. Распределяем 80% между всеми предками NFT
        uint256 totalAncestors = ancestors[nftId].length;
        if (totalAncestors == 0) totalAncestors = 1; // Если это оригинальный NFT, у него только 1 владелец

        uint256 ownerShare = ownersReward / totalAncestors;

        for (uint i = 0; i < ancestors[nftId].length; i++) {
            address ancestorOwner = ownerOf(ancestors[nftId][i]);
            beatCoin.transfer(ancestorOwner, ownerShare);
        }

        // Если это оригинальный NFT, просто платим владельцу
        if (ancestors[nftId].length == 0) {
            address nftOwner = ownerOf(nftId);
            beatCoin.transfer(nftOwner, ownersReward);
        }

        // 3. Распределение 10% среди стейкеров
        uint256 rewardPerStake = stakingRewardPool / totalStaked[nftId];

        for (uint i = 0; i < totalStaked[nftId]; i++) {
            address staker = stakes[nftId][msg.sender].amount > 0 ? msg.sender : address(0);
            if (staker != address(0)) {
                beatCoin.transfer(staker, rewardPerStake);
            }
        }

        emit RewardDistributed(nftId, stakingRewardPool);
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

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
