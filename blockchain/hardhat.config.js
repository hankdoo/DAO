require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    polygon_testnet: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  etherscan:{
    apiKey:process.env.API_KEY
  },
};
