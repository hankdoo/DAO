// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract CrownNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public _tokenCounter;
    uint256 public constant MAX_SUPPLY = 10;
    string private _baseUri;

    constructor() ERC721("CrownNFT", "CROWN") {
        _tokenCounter.increment();
    }

    function mint(address to) public  onlyOwner returns (uint256)  {
        uint256 tokenId = _tokenCounter.current();
        require(tokenId <= MAX_SUPPLY, "CROWNNFT: More than max supply");
        _mint(to, tokenId);
        _tokenCounter.increment();
        return tokenId;
    }
    

    function _baseURI() internal view override returns(string memory){
        return _baseUri;
    }

     function setBaseUri(string calldata baseUri) external onlyOwner{
         _baseUri = baseUri;
    }
}
