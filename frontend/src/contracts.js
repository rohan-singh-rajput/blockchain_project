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

    const [sellers, itemIds, prices, quantities] =
        await procurement.getAllListings();

    const listings = [];

    for (let i = 0; i < itemIds.length; i++) {
        const itemId = Number(itemIds[i]);
        const seller = sellers[i];
        const price = prices[i];
        const quantity = quantities[i];

        const item = await procurement.items(itemId);

        const brand = item.brand ?? item[0];
        const name = item.name ?? item[1];
        const totalQty = item.total_quantity ?? item[2];

        listings.push({
            id: i,
            itemId,
            brand,
            name,
            price: price.toString(),
            seller,
            sellerQuantity: Number(quantity),
            totalQuantity: Number(totalQty),
        });
    }

    console.log("Listed items:", listings);
    return listings;
}

export async function getCatalogItems() {
    const procurement = await getProcurement();

    const countBN = await procurement.itemCount();
    const count = Number(countBN);

    const catalog = [];

    for (let i = 0; i < count; i++) {
        const item = await procurement.items(i);

        const brand = item.brand ?? item[0];
        const name = item.name ?? item[1];
        const totalQty = item.total_quantity ?? item[2];

        catalog.push({
            itemId: i,
            brand,
            name,
            totalQuantity: Number(totalQty),
        });
    }

    console.log("Catalog items:", catalog);
    return catalog;
}
