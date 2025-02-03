// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CryptoJam is Ownable {
    address public jamTokenContract;
    address public nftunesContract;

    event ChallengeCreated(uint256 indexed challengeId, address indexed creator, string description);
    event ChallengeCompleted(uint256 indexed challengeId, address indexed participant);
    event AuctionStarted(uint256 indexed nftId, uint256 startingPrice);
    event AuctionEnded(uint256 indexed nftId, address indexed winner, uint256 finalPrice);

    struct Challenge {
        address creator;
        string description;
        uint256 rewardPool;
        bool isActive;
    }

    struct Auction {
        uint256 nftId;
        address seller;
        uint256 highestBid;
        address highestBidder;
        bool isActive;
    }

    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => Auction) public auctions;
    uint256 public nextChallengeId;
    uint256 public nextAuctionId;

    constructor(address _jamTokenContract, address _nftunesContract) Ownable(msg.sender) {
        jamTokenContract = _jamTokenContract;
        nftunesContract = _nftunesContract;
    }

    function createChallenge(string memory description, uint256 rewardPool) external {
        require(rewardPool > 0, "Reward pool must be greater than zero");
        ERC20 jamToken = ERC20(jamTokenContract);
        require(jamToken.balanceOf(msg.sender) >= rewardPool, "Insufficient balance");
        jamToken.transferFrom(msg.sender, address(this), rewardPool);
        challenges[nextChallengeId] = Challenge(msg.sender, description, rewardPool, true);
        emit ChallengeCreated(nextChallengeId, msg.sender, description);
        nextChallengeId++;
    }

    function completeChallenge(uint256 challengeId, address participant) external onlyOwner {
        require(challenges[challengeId].isActive, "Challenge is not active");
        ERC20 jamToken = ERC20(jamTokenContract);
        jamToken.transfer(participant, challenges[challengeId].rewardPool);
        challenges[challengeId].isActive = false;
        emit ChallengeCompleted(challengeId, participant);
    }

    function startAuction(uint256 nftId, uint256 startingPrice) external {
        auctions[nextAuctionId] = Auction(nftId, msg.sender, startingPrice, address(0), true);
        emit AuctionStarted(nftId, startingPrice);
        nextAuctionId++;
    }

    function placeBid(uint256 auctionId, uint256 bidAmount) external {
        require(auctions[auctionId].isActive, "Auction is not active");
        require(bidAmount > auctions[auctionId].highestBid, "Bid must be higher than current highest bid");
        auctions[auctionId].highestBid = bidAmount;
        auctions[auctionId].highestBidder = msg.sender;
    }

    function endAuction(uint256 auctionId) external onlyOwner {
        require(auctions[auctionId].isActive, "Auction is not active");
        auctions[auctionId].isActive = false;
        ERC721 nftunes = ERC721(nftunesContract);
        nftunes.transferFrom(auctions[auctionId].seller, auctions[auctionId].highestBidder, auctions[auctionId].nftId);
        emit AuctionEnded(auctions[auctionId].nftId, auctions[auctionId].highestBidder, auctions[auctionId].highestBid);
    }
}
