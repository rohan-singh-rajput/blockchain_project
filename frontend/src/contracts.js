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
    const contract = await getProcurement();
    const count = await contract.itemCount();

    let approvedItems = [];

    for (let i = 0; i < count; i++) {
        const item = await contract.items(i);

        if (item.approved) {
            approvedItems.push({
                id: i,
                brand: item.brand,
                name: item.name,
                price: Number(item.price),
                seller: item.seller,
                approved: item.approved
            });
        }
    }

    return approvedItems;
}
