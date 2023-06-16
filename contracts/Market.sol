// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Market is Ownable {
    IERC721Enumerable private nft;
    IERC20 private token;

    uint256 public tax = 10;

    struct TokenDetail {
        address author;
        uint256 price;
        uint256 tokenId;
    }

    mapping(uint256 => TokenDetail) listedNft;

    event SetNFT(IERC721Enumerable _nft);
    event SetToken(IERC20 _token);
    event SetTax(uint256 _tax);
    event UpToSell(address _author, uint256 _tokenId, uint256 _price);
    event SellOff(address _author, uint256 _tokenId);
    event UpdatePrice(address _author, uint256 _tokenId, uint256 _price);
    event BuyNFT(
        address author,
        address buyer,
        uint256 _tokenId,
        uint256 _price,
        uint _tax
    );

    constructor(IERC721Enumerable _nft, IERC20 _token) {
        nft = _nft;
        token = _token;
    }

    function setNft(IERC721Enumerable _nft) external onlyOwner {
        nft = _nft;
        emit SetNFT(_nft);
    }

    function setToken(IERC20 _token) external onlyOwner {
        token = _token;
        emit SetToken(_token);
    }

    function setTax(uint256 _tax) external onlyOwner {
        tax = _tax;
        emit SetTax(tax);
    }

    function renounceOwnership() public override onlyOwner {}

    function withDrawErc20() external onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    function getListedNft() public view returns (TokenDetail[] memory) {
        uint256 balance = nft.balanceOf(address(this));
        TokenDetail[] memory myNft = new TokenDetail[](balance);
        for (uint256 i = 0; i < balance; i++) {
            myNft[i] = listedNft[nft.tokenOfOwnerByIndex(address(this), i)];
        }
        return myNft;
    }

    function upToSell(uint256 _tokenId, uint256 _price) public {
        listedNft[_tokenId] = TokenDetail(msg.sender, _price, _tokenId);
        nft.transferFrom(msg.sender, address(this), _tokenId);
        emit UpToSell(msg.sender, _tokenId, _price);
    }

    function sellOff(uint256 _tokenId) public {
        require(
            nft.ownerOf(_tokenId) == address(this),
            "This NFT not exist on marketplace"
        );
        require(
            listedNft[_tokenId].author == msg.sender,
            "Only owner can sellOff this NFT"
        );
        nft.transferFrom(address(this), msg.sender, _tokenId);
        emit SellOff(msg.sender, _tokenId);
    }

    function updateListedNftPrice(uint256 _tokenId, uint256 _price) public {
        require(
            nft.ownerOf(_tokenId) == address(this),
            "This NFT not exist on marketplace"
        );
        require(
            listedNft[_tokenId].author == msg.sender,
            "Only owner can update price  this NFT"
        );
        listedNft[_tokenId].price = _price;
        emit UpdatePrice(msg.sender, _tokenId, _price);
    }

    function buyNFT(uint256 _tokenId) public {
        TokenDetail memory tokenDetail = listedNft[_tokenId];
        require(
            token.balanceOf(msg.sender) >= tokenDetail.price,
            "Insufficient account balance"
        );
        require(
            nft.ownerOf(_tokenId) == address(this),
            "This NFT not exist on marketplace"
        );
        require(
            token.transferFrom(msg.sender,
                tokenDetail.author,
                (tokenDetail.price * (100 - tax)) / 100
            ),
            "Transfer failed"
        );

        require(
            token.transferFrom(msg.sender,address(this), (tokenDetail.price * tax) / 100),
            "Transfer failed"
        );
        nft.transferFrom(address(this), msg.sender, _tokenId);
        emit BuyNFT(
            tokenDetail.author,
            msg.sender,
            _tokenId,
            tokenDetail.price,
            tax
        );
    }
}
