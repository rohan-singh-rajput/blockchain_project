// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Procurement.sol";

contract Escrow {
    Procurement public procurement;

    struct Order {
        uint256 itemId;
        address seller;
        address buyer;
        uint256 quantity;
        uint256 amount;   // total amount paid (price * quantity)
        bool delivered;
        bool paidOut;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    constructor(address procurementAddress) {
        procurement = Procurement(procurementAddress);
    }

    /// @notice Buyer creates an order for a seller's listing
    function createOrder(
        uint256 itemId,
        address seller,
        uint256 quantity
    ) external payable {
        require(quantity > 0, "Quantity must be > 0");

        (
            uint256 storedItemId,
            uint256 selling_price,
            uint256 selling_quantity
        ) = procurement.sellingItems(seller, itemId);

        require(storedItemId == itemId, "Listing not found");
        require(quantity <= selling_quantity, "Not enough quantity");

        uint256 totalPrice = selling_price * quantity;
        require(msg.value == totalPrice, "Incorrect amount");

        orders[orderCount] = Order({
            itemId: itemId,
            seller: seller,
            buyer: msg.sender,
            quantity: quantity,
            amount: msg.value,
            delivered: false,
            paidOut: false
        });

        // Reserve the quantity on Procurement (will also update total_quantity)
        procurement.consumeSellerQuantity(seller, itemId, quantity);

        orderCount++;
    }

    /// @notice Buyer confirms delivery so payment is released to seller
    function confirmDelivery(uint256 orderId) external {
        Order storage o = orders[orderId];
        require(msg.sender == o.buyer, "Only buyer");
        require(!o.paidOut, "Already paid");

        o.delivered = true;

        payable(o.seller).transfer(o.amount);
        o.paidOut = true;
    }
}
