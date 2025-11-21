require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/cLb-Rg5yOYkU2bkYM8oJH",
      accounts: ["eab6739d8397364aaf85ea17c025f787be8085899973bcdd3bd2dc3df75b0f47"]
    }
  }
};
