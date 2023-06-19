# DAO

WINDAO 0x8B784D5CD20e7c61b82c3C7ead1A2C80a143824A
BUSD 0xff49485533F75209D9F9c060CeB8cC304559641f
SEEDWALLET 0xf38c395BD41fE60e5EF9CE58956B6F422ba8af42
PRIVATEWALLET 0xB294305200438c2825E69F2f6BB87e6a5656a563
CROWNNFT 0x3F7a196051d4882B0ad627d8766c21cf75064FE8
MARKET 0x638e9FC5FE251fA631576F47d733F09103ee8a61

npx hardhat --network polygon_testnet verify --contract "contracts/WinDAO.sol:WINDAO" 0x8B784D5CD20e7c61b82c3C7ead1A2C80a143824A

npx hardhat --network polygon_testnet verify --contract "contracts/SeedWallet.sol:SeedWallet" 0xf38c395BD41fE60e5EF9CE58956B6F422ba8af42 "0xff49485533F75209D9F9c060CeB8cC304559641f" "0x8B784D5CD20e7c61b82c3C7ead1A2C80a143824A"

npx hardhat --network polygon_testnet verify --contract "contracts/PrivateWallet.sol:PrivateWallet" 0xB294305200438c2825E69F2f6BB87e6a5656a563 "0xff49485533F75209D9F9c060CeB8cC304559641f" "0x8B784D5CD20e7c61b82c3C7ead1A2C80a143824A"