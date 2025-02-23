# 🗳️ Decentralized Voting dApp

A fully decentralized voting application built with **Solidity, Hardhat, TypeScript, React, and Ethers.js**. This dApp allows users to cast their votes on the Ethereum blockchain securely and transparently.

## 🚀 Features
- 🏛 **Smart Contract-based Voting**
- 🔐 **Decentralized & Transparent**
- 🦊 **MetaMask Wallet Integration**
- 📊 **Real-time Vote Count Updates**
- 🎨 **Modern UI with React & TypeScript**
- 🌐 **Deployed on Sepolia Testnet**

---

## 🏗️ Tech Stack

| Technology      | Usage           |
|---------------|----------------|
| Solidity      | Smart Contract Development |
| Hardhat       | Contract Compilation & Deployment |
| TypeScript    | Frontend & Backend Logic |
| React         | User Interface |
| Ethers.js     | Ethereum Blockchain Interaction |
| Alchemy       | Ethereum Node Provider |

---

## 🛠️ Setup & Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+)
- **Hardhat** (`npm install --save-dev hardhat`)
- **MetaMask Wallet** (Browser Extension)

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/yourusername/decentralized-voting.git
 cd decentralized-voting
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add:
```env
VITE_ALCHEMY_SEPOLIA_URL=YOUR_ALCHEMY_SEPOLIA_URL
VITE_ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
VITE_PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

### 4️⃣ Compile the Smart Contract
```sh
npx hardhat compile
```

### 5️⃣ Deploy to Sepolia Testnet
```sh
npx hardhat run scripts/deploy.ts --network sepolia
```

Copy the **contract address** from the terminal and update `.env`.

### 6️⃣ Start the Frontend
```sh
npm run dev
```

---

## 📜 Smart Contract Overview

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidatesCount;

    constructor(string[] memory _candidateNames) {
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates[i] = Candidate(_candidateNames[i], 0);
            candidatesCount++;
        }
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId < candidatesCount, "Invalid candidate ID");
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }

    function getVotes(uint _candidateId) public view returns (uint) {
        require(_candidateId < candidatesCount, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }
}
```

---


## 📌 How to Use
1️⃣ **Connect MetaMask** → Click "Connect Wallet" to log in with MetaMask.
2️⃣ **View Candidates** → See the list of available candidates.
3️⃣ **Vote** → Click the "Vote" button to cast your vote.
4️⃣ **Check Votes** → View the updated vote count for each candidate.

---

## 🎯 Future Enhancements
✅ Improve UI/UX with animations 🎨  
✅ Add blockchain event listeners for real-time updates ⏳  
✅ Deploy on a Layer 2 solution for lower gas fees ⛽

---

## 🤝 Contributing
Feel free to fork, contribute, and submit a pull request! 🚀

```sh
git clone https://github.com/yourusername/decentralized-voting.git
cd decentralized-voting
git checkout -b feature-branch
```

---

## 🔗 Links
- 📜 **Smart Contract on Sepolia:** [View on Etherscan](https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS)
- 🌍 **Frontend Deployed at:** [YOUR_DEPLOYMENT_URL]
- 📝 **Project Repository:** [GitHub Repo](https://github.com/yourusername/decentralized-voting)

---

## 📜 License
This project is licensed under the **MIT License**.

📢 **Give it a ⭐ if you found it useful!** 🚀

