// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Registry.sol";

contract Procurement {
    Registry public registry;
    address public escrow; // address of Escrow contract

    struct Item {
        string brand;
        string name;
        uint256 total_quantity; // sum of all seller quantities for this item
    }

    struct SellerItem {
        uint256 itemId;           // which catalog item
        uint256 selling_price;    // price per unit (in wei)
        uint256 selling_quantity; // how many units this seller is offering
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;

    mapping(address => mapping(uint256 => SellerItem)) public sellingItems;

    address[] public allSellers;
    mapping(address => bool) public isKnownSeller;

    constructor(address registryAddress) {
        registry = Registry(registryAddress);
    }

    // -------- Admin-only config --------

    function setEscrow(address _escrow) external {
        require(msg.sender == registry.admin(), "Not admin");
        require(_escrow != address(0), "Invalid escrow");
        escrow = _escrow;
    }

    /// @notice Admin defines a catalog item
    function approveItem(
        string memory brand,
        string memory name
    ) external {
        require(msg.sender == registry.admin(), "Not admin");
        require(registry.isBrandVerified(brand), "Brand not verified");

        items[itemCount] = Item({
            brand: brand,
            name: name,
            total_quantity: 0
        });

        itemCount++;
    }

    /// @notice Verified seller lists an already-defined item for sale
    function submitItem(
        uint256 itemId,
        uint256 selling_price,
        uint256 selling_quantity
    ) external {
        require(registry.isSellerVerified(msg.sender), "Seller not verified");
        require(itemId < itemCount, "Invalid itemId");
        require(selling_price > 0, "Price must be > 0");
        require(selling_quantity > 0, "Quantity must be > 0");

        if (!isKnownSeller[msg.sender]) {
            isKnownSeller[msg.sender] = true;
            allSellers.push(msg.sender);
        }

        SellerItem storage listing = sellingItems[msg.sender][itemId];
        Item storage item = items[itemId];

        if (listing.selling_quantity > 0) {
            item.total_quantity -= listing.selling_quantity;
        }

        listing.itemId = itemId;
        listing.selling_price = selling_price;
        listing.selling_quantity = selling_quantity;

        item.total_quantity += selling_quantity;
    }

    /// @notice Called by Escrow to consume seller quantity when an order is created
    function consumeSellerQuantity(
        address seller,
        uint256 itemId,
        uint256 quantity
    ) external {
        require(msg.sender == escrow, "Only escrow");
        require(quantity > 0, "Quantity must be > 0");
        require(itemId < itemCount, "Invalid itemId");

        SellerItem storage listing = sellingItems[seller][itemId];
        Item storage item = items[itemId];

        require(listing.selling_quantity >= quantity, "Not enough quantity listed");

        listing.selling_quantity -= quantity;
        item.total_quantity -= quantity;
    }

    // -------- View helper for frontend --------

    function getAllListings()
        external
        view
        returns (
            address[] memory sellers,
            uint256[] memory itemIds,
            uint256[] memory prices,
            uint256[] memory quantities
        )
    {
        uint256 sellerCount = allSellers.length;
        uint256 totalListings = 0;

        for (uint256 i = 0; i < sellerCount; i++) {
            address s = allSellers[i];
            for (uint256 j = 0; j < itemCount; j++) {
                if (sellingItems[s][j].selling_quantity > 0) {
                    totalListings++;
                }
            }
        }

        sellers = new address[](totalListings);
        itemIds = new uint256[](totalListings);
        prices = new uint256[](totalListings);
        quantities = new uint256[](totalListings);

        uint256 k = 0;
        for (uint256 i = 0; i < sellerCount; i++) {
            address s = allSellers[i];
            for (uint256 j = 0; j < itemCount; j++) {
                SellerItem storage listing = sellingItems[s][j];
                if (listing.selling_quantity > 0) {
                    sellers[k] = s;
                    itemIds[k] = j;
                    prices[k] = listing.selling_price;
                    quantities[k] = listing.selling_quantity;
                    k++;
                }
            }
        }
    }
}
