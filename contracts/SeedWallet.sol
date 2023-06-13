// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SeedWallet is Ownable, ReentrancyGuard {
    struct User {
        uint256 balance;

    }

    uint256 public _min;
    uint256 public _max;
    uint256 public _startAt;
    uint256 public _cost;
    uint256 public _balanceTotal;
    bool public _soldOut;
    address public _exchangeToken;
    address[] private _userKeys;
    address[] public whiteList;

    mapping(address => User) public _user;

    event SoldOut(bool soldout);
    event Buy(address indexed buyer, uint256 amount);

    constructor(address exchangeToken) {
        _exchangeToken=exchangeToken;
    }

    function initialize(
        uint256 min,
        uint256 max,
        uint256 startAt,
        uint256 balanceTotal
    ) external onlyOwner {
        require(min <= max, "SEED: Min lower than max");
        _min = min;
        _max = max;
        _startAt = startAt;
        _balanceTotal = balanceTotal;
    }

    function buy(uint256 amount) external onlyAfterStart nonReentrant {
        require(_max > 0, "SEED: Not initial");
        require(_min <= _max, "SEED: min higer than max");
        require(amount >= _min, "SEED: min invalid");
        require(amount<=_max , "SEED: max invalid");
        require(
            getTotalBought() + amount <= _balanceTotal,
            "SEED: Higer than total"
        );
        require(isWhiteList(msg.sender), "SEED: Address not whitelist");
        if (!isExistAddress(msg.sender)) {
            _user[msg.sender] = User(0);
            _userKeys.push(msg.sender);
        }

        User storage user = _user[msg.sender];
        user.balance+=amount;

        if (getTotalBought() == _balanceTotal) {
            _soldOut = true;
            emit SoldOut(_soldOut);
        }

        uint256 total = (amount * 10 ** 18) * _cost;

        uint256 allowance = IERC20(_exchangeToken).allowance(msg.sender,address(this));

        require(allowance>=total,"SEED:Insufficent allowance");

        IERC20(_exchangeToken).transferFrom(msg.sender,address(this),total);

        emit Buy(msg.sender, amount);
    }

    function isWhiteList(address user) public view returns (bool) {
        for (uint256 i = 0; i < whiteList.length; i++) {
            if (whiteList[i] == user) {
                return true;
            }
        }
        return false;
    }

    function setWhiteList(address[] calldata users) external onlyOwner{
        delete whiteList;
        whiteList=users;
    }

    function getTotalBought() public view returns (uint256) {
        uint256 totalBought = 0;
        for (uint256 i = 0; i < _userKeys.length; i++) {
            totalBought += _user[_userKeys[i]].balance;
        }
        return totalBought;
    }

    function getTotalUnbought() public view returns(uint256){
        return _balanceTotal-getTotalBought();
    }
    

    function isExistAddress(address user) public view returns (bool) {
        for (uint256 i = 0; i < _userKeys.length; i++) {
            if (_userKeys[i] == user) {
                return true;
            }
        }
        return false;
    }

    modifier onlyAfterStart() {
        require(block.timestamp >= _startAt, "SEED: Not started");
        _;
    }

    // function withdraw

}
