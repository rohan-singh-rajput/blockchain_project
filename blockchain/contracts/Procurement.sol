// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Registry.sol";

contract Procurement {
    Registry registry;

    struct Item {
        string brand;
        string name;
        uint256 price;
        address seller;
        bool approved;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    constructor(address registryAddress) {
        registry = Registry(registryAddress);
    }

    function submitItem(
        string memory brand,
        string memory name,
        uint256 price
    ) external {
        require(registry.isSellerVerified(msg.sender), "Seller not verified");
        require(registry.isBrandVerified(brand), "Brand not verified");

        items[itemCount] = Item(
            brand,
            name,
            price,
            msg.sender,
            false
        );

        itemCount++;
    }

    function approveItem(uint256 itemId) external {
        require(msg.sender == registry.admin(), "Not admin");
        items[itemId].approved = true;
    }
}
