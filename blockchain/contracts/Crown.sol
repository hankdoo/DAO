// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract CrownNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenCounter;
    uint256 public constant MAX_SUPPLY = 10;
    string private _baseUri;
    string public baseExtension = ".json?alt=media";

    constructor() ERC721("CrownNFT", "CROWN") {}

    function mint(address to) external onlyOwner returns (uint256) {
        _tokenCounter.increment();
        uint256 tokenId = _tokenCounter.current();
        require(tokenId <= MAX_SUPPLY, "CROWNNFT: More than max supply");
        _mint(to, tokenId);
        return tokenId;
    }

    function burn(uint256 tokenId) public {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "CROWNNFT: Not owner or approved by owner"
        );
        _burn(tokenId);
    }

    function setExtension(string memory _extension) external onlyOwner {
        baseExtension = _extension;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

    function setBaseUri(string calldata baseUri) external onlyOwner {
        _baseUri = baseUri;
    }

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(_tokenId);
        return
            string(
                abi.encodePacked(_baseUri, _tokenId.toString(), baseExtension)
            );
    }

    function listTokenIds(
        address owner
    ) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory ids = new uint256[](balance);
        for (uint i = 0; i < balance; i++) {
            ids[i] = tokenOfOwnerByIndex(owner, i);
        }
        return ids;
    }

    function renounceOwnership() public override onlyOwner {}
}
