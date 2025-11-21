import { ethers } from "ethers";
import { getSigner } from "./web3";

import RegistryABI from "./abi/Registry.json";
import ProcurementABI from "./abi/Procurement.json";
import EscrowABI from "./abi/Escrow.json";

import {
    RegistryAddress,
    ProcurementAddress,
    EscrowAddress
} from "./contractAddresses";

export const getRegistry = async () => {
    const signer = await getSigner();
    return new ethers.Contract(RegistryAddress, RegistryABI.abi, signer);
};

export const getProcurement = async () => {
    const signer = await getSigner();
    return new ethers.Contract(ProcurementAddress, ProcurementABI.abi, signer);
};

export const getEscrow = async () => {
    const signer = await getSigner();
    return new ethers.Contract(EscrowAddress, EscrowABI.abi, signer);
};


export async function getApprovedItems() {
    const procurement = await getProcurement();

    // Get all seller listings
    const [sellers, itemIds, prices, quantities] =
        await procurement.getAllListings();

    const listings = [];

    for (let i = 0; i < itemIds.length; i++) {
        const itemId = Number(itemIds[i]);
        const seller = sellers[i];
        const price = prices[i];          // BigNumber / bigint (ethers v6)
        const quantity = quantities[i];

        // Fetch catalog item info (brand, name, total_quantity)
        const item = await procurement.items(itemId);

        const brand = item.brand ?? item[0];
        const name = item.name ?? item[1];
        const totalQty = item.total_quantity ?? item[2];

        listings.push({
            id: i,                       // local index in this array
            itemId,
            brand,
            name,
            price: price.toString(),     // keep as string to avoid precision issues
            seller,
            sellerQuantity: Number(quantity),
            totalQuantity: Number(totalQty),
        });
    }

    console.log("Listed items:", listings);
    return listings;
}

