require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/cLb-Rg5yOYkU2bkYM8oJH",
      accounts: ["0a48fe4353089c25a8f4aad095650d62eae03437f80964366e619d853d693a71"]
    }
  }
};
