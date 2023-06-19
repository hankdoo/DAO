// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is Ownable {
    IERC721 private nft;
    IERC20 private token;
    uint256 public constant MINIUM_BID_RATE = 110;
    uint256 public constant AUCTION_SERVICE_FEE_RATE = 5;
    struct AuctionInfo {
        address auctioneer;
        uint256 tokenId;
        uint256 initialPrice;
        uint256 lastBid;
        address lastBidder;
        uint256 startTime;
        uint256 endTime;
        bool completed;
        bool active;
        uint256 auctionId;
    }

    AuctionInfo[] public auctions;

    constructor(IERC721 _nft, IERC20 _token) {
        nft = _nft;
        token = _token;
    }

    function createAuction(
        uint256 _tokenId,
        uint256 _initialPrice,
        uint256 _startTime,
        uint256 _endTime
    ) external {
        require(_startTime >= block.timestamp, "Auction can not start");
        require(_startTime < _endTime, "Auction can not end before it starts");
        require(_initialPrice > 0, "Initial price must be greater than 0");
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Not the ower of this NFT"
        );
        require(
            nft.getApproved(_tokenId) == address(this),
            "This contract must be approved to transfer the token"
        );
        nft.safeTransferFrom(msg.sender, address(this), _tokenId, "");
        AuctionInfo memory _auction = AuctionInfo(
            msg.sender,
            _tokenId,
            _initialPrice,
            _initialPrice,
            address(0),
            _startTime,
            _endTime,
            false,
            true,
            auctions.length
        );
        auctions.push(_auction);
    }

    function joinAuction(uint256 _auctionId, uint _amountBid) external {
        AuctionInfo memory _auction = auctions[_auctionId];
        require(
            _auction.startTime >= block.timestamp,
            "Auction has not started"
        );
        require(_auction.endTime <= block.timestamp, "Auction time out to bid");
        require(_auction.completed == false, "Auction is already completed");
        require(_auction.active, "Auction is not active");
        uint256 miniAmountBid = _auction.lastBidder == address(0)
            ? _auction.initialPrice
            : (_auction.lastBid * MINIUM_BID_RATE) / 100;
        require(
            _amountBid >= miniAmountBid,
            "Bid price must be greater than the minimum price"
        );
        require(
            token.balanceOf(msg.sender) >= _amountBid,
            "Insufficient balance"
        );
        require(
            token.allowance(msg.sender, address(this)) >= _amountBid,
            "Insufficient balance"
        );
        require(
            msg.sender != _auction.auctioneer,
            "Can not bid on your own auction"
        );
        SafeERC20.safeTransferFrom(
            token,
            msg.sender,
            address(this),
            _amountBid
        );
        //refund token to previous bidder
        if (_auction.lastBidder != address(0)) {
            token.transferFrom(
                address(this),
                _auction.lastBidder,
                _auction.lastBid
            );
        }
        auctions[_auctionId].lastBidder = msg.sender;
        auctions[_auctionId].lastBid = _amountBid;
    }

    function finishAuction(
        uint256 _auctionId
    ) external onlyAuctioneer(_auctionId) {
        AuctionInfo memory _auction = auctions[_auctionId];
        require(_auction.completed == false, "Auction is already completed");
        require(_auction.active, "Auction is not active");
        require(
            _auction.endTime <= block.timestamp,
            "Auction time is not over yet"
        );
        address receiver = _auction.lastBidder;
        if (receiver == address(0)) {
            receiver = _auction.auctioneer;
        }
        nft.safeTransferFrom(address(this), receiver, _auction.tokenId, "");
        uint256 auctioneerReceive = (_auction.lastBid *
            (100 - AUCTION_SERVICE_FEE_RATE)) / 100;
        token.transferFrom(
            address(this),
            _auction.auctioneer,
            auctioneerReceive
        );
        auctions[_auctionId].completed = true;
        auctions[_auctionId].active = false;
    }

    function cancelAuction(
        uint256 _auctionId
    ) external onlyAuctioneer(_auctionId) {
        AuctionInfo memory _auction = auctions[_auctionId];
        require(_auction.completed == false, "Auction is already completed");
        require(_auction.active, "Auction is not active");
        require(
            _auction.endTime > block.timestamp,
            "Auction must be in runtime"
        );
        nft.safeTransferFrom(
            address(this),
            _auction.auctioneer,
            _auction.tokenId,
            ""
        );
        if (_auction.lastBidder != address(0)) {
            token.transferFrom(
                address(this),
                _auction.lastBidder,
                _auction.lastBid
            );
        }
        auctions[_auctionId].completed = true;
        auctions[_auctionId].active = false;
    }

    function getAuction(
        uint256 _auctionId
    ) public view returns (AuctionInfo memory) {
        return auctions[_auctionId];
    }

    function getAuctionByStatus(
        bool _active
    ) public view returns (AuctionInfo[] memory) {
        AuctionInfo[] memory results = new AuctionInfo[](auctions.length);
        for (uint i = 0; i < auctions.length; i++) {
            if (auctions[i].active == _active) {
                results[i] = auctions[i];
            }
        }
        return results;
    }

    function withdrawErc20() external onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }

    modifier onlyAuctioneer(uint256 _auctionId) {
        require(
            msg.sender == auctions[_auctionId].auctioneer ||
                msg.sender == owner(),
            "Only auctioneer or owner can perform this action"
        );
        _;
    }
}
