// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SeedWallet is Ownable, ReentrancyGuard {
    struct User {
        uint256 balance;
        bool isClaimTGE;
    }
    uint256 public cap;
    uint256 public cost;
    uint256 public min;
    uint256 public max;
    uint256 public totalTokensSold;
    uint256 public totalBusdRaised;
    uint256 public startAt;
    uint256 public endAt;
    uint256 public tgeStart;
    uint256 public lockingTime;
    uint256 public tge;
    bool public soldOut;
    address public _exchangeToken;
    address public _token;
    address[] public whiteList;

    mapping(address => User) public users;

    event SoldOut(bool soldout);
    event Buy(address indexed buyer, uint256 amount);
    event ClaimWDA(address indexed buyer, uint256 amount);

    constructor(address exchangeToken, address token) {
        _exchangeToken = exchangeToken;
        _token = token;
    }

    function initialize(
        uint256 _min,
        uint256 _max,
        uint256 _startAt,
        uint256 _endAt,
        uint256 _cap,
        uint256 _cost,
        uint256 _tge
    ) external onlyOwner {
        require(_min <= _max, "SEED: Min lower than max");
        cap = _cap;
        min = _min;
        max = _max;
        startAt = _startAt;
        endAt = _endAt;
        cost = _cost;
        tge = _tge;
    }

    function buy(uint256 amount) external onlyDuring nonReentrant {
        require(max > 0, "SEED: Not initial");
        require(amount >= min || amount <= max, "SEED:out of bound");
        require(totalTokensSold + amount <= cap, "SEED: Higer than total");
        require(isWhiteList(msg.sender), "SEED: Address not whitelist");

        User storage user = users[msg.sender];
        user.balance += amount;

        if (totalTokensSold == cap) {
            soldOut = true;
            emit SoldOut(soldOut);
        }
        uint256 total = amount * cost;
        require(
            IERC20(_exchangeToken).transferFrom(
                msg.sender,
                address(this),
                total
            ),
            "Token transfer failed"
        );
        totalTokensSold += amount;
        totalBusdRaised += total;
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

    function setWhiteList(address[] calldata _users) external onlyOwner {
        delete whiteList;
        whiteList = _users;
    }

    function getBalanceOfSeed() public view returns (uint256) {
        return cap - totalTokensSold;
    }

    function withDrawBusd() external onlyOwner {
        uint256 amount = IERC20(_exchangeToken).balanceOf(address(this));
        require(IERC20(_exchangeToken).transfer(owner(), amount),"Transfer token failed");
    }

    function setTgeStart(
        uint256 _tgeStart,
        uint256 _lockingTime
    ) external onlyOwner {
        require(tgeStart >= block.timestamp && tgeStart>=endAt, "SEED: Tge start invalid");
        tgeStart = _tgeStart;
        lockingTime = _lockingTime + tgeStart;
    }

    function claimTGE() external onlyTgeStart nonReentrant {
        require(block.timestamp >= lockingTime, "SEED: Lock in time");
        User storage user = users[msg.sender];
        require(!user.isClaimTGE, "SEED: Already claim tge");
        uint256 amount = (user.balance * tge) / 100;
        _claimToken(amount);
        user.isClaimTGE = true;
    }

    function _claimToken(uint256 amount) internal {
        uint256 balanceOfSeed = IERC20(_token).balanceOf(address(this));
        require(balanceOfSeed >= amount, "Insufficent token");
        require(IERC20(_token).transfer(msg.sender, amount),"Transfer token failed");
        emit ClaimWDA(msg.sender, amount);
    }

    modifier onlyDuring() {
        require(
            block.timestamp >= startAt && block.timestamp <= endAt,
            "SEED: Not in time"
        );
        _;
    }

    modifier onlyTgeStart() {
        require(block.timestamp >= tgeStart, "SEED: early for tge");
        _;
    }
}
