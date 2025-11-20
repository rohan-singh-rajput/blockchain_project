const hre = require("hardhat");

async function main() {
    console.log("Deploying Registry...");
    const Registry = await hre.ethers.getContractFactory("Registry");
    const registry = await Registry.deploy();
    await registry.waitForDeployment();
    console.log("Registry deployed at:", await registry.getAddress());

    console.log("Deploying Procurement...");
    const Procurement = await hre.ethers.getContractFactory("Procurement");
    const procurement = await Procurement.deploy(await registry.getAddress());
    await procurement.waitForDeployment();
    console.log("Procurement deployed at:", await procurement.getAddress());

    console.log("Deploying Escrow...");
    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(await procurement.getAddress());
    await escrow.waitForDeployment();
    console.log("Escrow deployed at:", await escrow.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
