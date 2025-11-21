# **GovProcure – Decentralized Government Procurement System**

## Group No 13
- Arijeet Rakshit - 2024H1030183H
- Pranav Mate - 2024H1030196H
- Rajput Rohan Singh - 2024H1030169H
- Sujay Suresh Patil - 2024H1030174H
- Tanuj Dutta - 2024H1030201H

A blockchain-based procurement platform designed to ensure **verified sellers**,  
**transparent catalog approvals**, and **escrow-based payments**.  
Built using **Solidity**, **Hardhat**, and a **React frontend**.

---

##  Overview

GovProcure introduces transparency and accountability in public procurement by leveraging smart contracts.

The system ensures:

- Only government-verified sellers can list items  
- Catalog items must be approved by the admin  
- Buyers pay securely through an escrow system  
- Payments are released only after delivery confirmation  

---

##  Core Components

### **1. Registry Contract**

Responsible for verification and catalog management.

**Features:**

- Verify sellers  
- Approve brands  
- Approve catalog items  
- Fetch approved items list  

**Key Functions**

| Function | Description |
|---------|-------------|
| `verifySeller(address)` | Marks a seller as verified |
| `verifyBrand(string)` | Approves a product brand |
| `verifyItem(string brand, string name)` | Approves catalog items |
| `isSellerVerified(address)` | Returns seller verification status |
| `getApprovedItems()` | Returns list of approved catalog items |

---

### **2. Procurement Contract**

Handles seller listings for approved catalog items.

**Key Functions**

| Function | Description |
|---------|-------------|
| `approveItem(brand, name)` | Admin approves a catalog item |
| `submitItem(itemId, price, qty)` | Seller lists an item for sale |
| `getSellerItems()` | Returns listed seller items |

---

### **3. Escrow Contract**

Secures buyer payments until delivery is confirmed.

**Key Functions**

| Function | Description |
|---------|-------------|
| `createOrder(itemId, seller, qty)` | Buyer places order and locks ETH |
| `confirmDelivery(orderId)` | Buyer confirms delivery (funds released) |
| `getOrder(orderId)` | Fetches order details |

---

##  Workflow Summary

### **Admin Flow**
1. Verify sellers  
2. Approve brands  
3. Approve catalog items  
4. Set escrow contract address  

---

### **Seller Flow**
1. Seller must be verified  
2. Seller lists approved catalog items  
3. Provides price and quantity  

---

### **Buyer Flow**
1. Views approved + listed items  
2. Selects seller  
3. Creates order → payment goes to escrow  
4. Confirms delivery → seller gets paid  

---

## Installation & Setup

### **Install dependencies**
```bash
npm install --save-dev hardhat


npx hardhat compile

Deploy Contracts

Use the deployment script:

npx hardhat run scripts/deploy.js --network sepolia


Copy the deployed addresses and update:

frontend/src/contracts/index.js
