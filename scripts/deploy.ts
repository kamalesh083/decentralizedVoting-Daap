import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config(); // Load .env

async function main() {
  const candidateNames = ["Alice", "Bob", "Charlie"];

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(candidateNames);

  await voting.waitForDeployment();
  console.log(`Voting contract deployed at: ${await voting.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
