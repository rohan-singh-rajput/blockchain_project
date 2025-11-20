// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Procurement.sol";

contract Escrow {
    Procurement procurement;

    struct Order {
        uint256 itemId;
        address buyer;
        uint256 amount;
        bool delivered;
        bool paidOut;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    constructor(address procurementAddress) {
        procurement = Procurement(procurementAddress);
    }

    function createOrder(uint256 itemId) external payable {
        (
            string memory brand, 
            string memory name, 
            uint256 price, 
            address seller, 
            bool approved
        ) = procurement.items(itemId);

        require(approved, "Item not approved");
        require(msg.value == price, "Incorrect amount");

        orders[orderCount] = Order(
            itemId,
            msg.sender,
            msg.value,
            false,
            false
        );

        orderCount++;
    }

    function confirmDelivery(uint256 orderId) external {
        Order storage o = orders[orderId];
        require(msg.sender == o.buyer, "Only buyer");

        o.delivered = true;

        (
            string memory brand, 
            string memory name, 
            uint256 price, 
            address seller, 
            bool approved
        ) = procurement.items(o.itemId);

        payable(seller).transfer(o.amount);
        o.paidOut = true;
    }
}
