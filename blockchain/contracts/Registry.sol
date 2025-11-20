// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Registry {
    address public admin;

    struct Seller {
        bool isVerified;
    }

    struct Brand {
        bool isVerified;
    }

    mapping(address => Seller) public sellers;
    mapping(string => Brand) public brands;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function verifySeller(address sellerAddress) external onlyAdmin {
        sellers[sellerAddress].isVerified = true;
    }

    function verifyBrand(string memory brandName) external onlyAdmin {
        brands[brandName].isVerified = true;
    }

    function isSellerVerified(address seller) external view returns (bool) {
        return sellers[seller].isVerified;
    }

    function isBrandVerified(string memory brandName) external view returns (bool) {
        return brands[brandName].isVerified;
    }
}
