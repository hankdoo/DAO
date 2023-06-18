// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract BUSD is ERC20{

    uint256 private TOTAL_SUPPLY = 1_000_000_000*10**decimals();

    constructor() ERC20("BUSD","BUSD") {
        _mint(msg.sender,TOTAL_SUPPLY);
    }

}