import { ethers } from "ethers";
import VotingABI from "../artifacts/contracts/Voting.sol/Voting.json";

const CONTRACT_ADDRESS: string = import.meta.env.VITE_CONTRACT_ADDRESS;

if (!CONTRACT_ADDRESS) {
  throw new Error("VITE_CONTRACT_ADDRESS is not defined in .env file");
}

// Extend `window` interface to include Ethereum provider
declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

// Function to get the Voting Contract
export const getVotingContract = async (): Promise<ethers.Contract> => {
  if (!window.ethereum) throw new Error("MetaMask is not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, VotingABI.abi, signer);
};

// Fetch all candidates dynamically
export const getCandidates = async (): Promise<string[]> => {
  try {
    const contract = await getVotingContract();
    const candidates = await contract.getCandidates();
    return candidates.map((candidate: { name: string }) => candidate.name);
  } catch (error) {
    console.error("🛑 Error fetching candidates:", error);
    throw new Error("Failed to fetch candidates. Please try again.");
  }
};

// Fetch vote counts dynamically based on candidate count
export const getVoteCounts = async (): Promise<string[]> => {
  try {
    const contract = await getVotingContract();
    const candidates = await getCandidates();
    const voteCounts = await Promise.all(
      candidates.map((_, i) => contract.getVotes(i))
    );
    return voteCounts.map((count) => count.toString()); // Convert BigInt to string
  } catch (error) {
    console.error("🛑 Error fetching vote counts:", error);
    throw new Error("Failed to fetch vote counts. Please try again.");
  }
};

// Cast a vote for a candidate
export const voteForCandidate = async (
  candidateIndex: number
): Promise<void> => {
  try {
    const contract = await getVotingContract();
    const tx = await contract.vote(candidateIndex);
    await tx.wait();
    console.log(`✅ Voted for candidate at index ${candidateIndex}`);
  } catch (error) {
    console.error("🛑 Error voting:", error);
    throw new Error("Voting failed. Make sure you are connected to MetaMask.");
  }
};

// Check if user has already voted
export const hasUserVoted = async (userAddress: string): Promise<boolean> => {
  try {
    const contract = await getVotingContract();
    return await contract.hasVoted(userAddress);
  } catch (error) {
    console.error("🛑 Error checking vote status:", error);
    throw new Error("Failed to check voting status. Try again.");
  }
};
