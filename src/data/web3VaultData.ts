export interface Web3Section {
  id: string;
  title: string;
  status: "Learning" | "Practicing" | "Designing" | "Exploring";
  chips: string[];
}

export const web3VaultData: Web3Section[] = [
  {
    id: "solidity-basics",
    title: "Solidity Basics",
    status: "Learning",
    chips: ["Contracts", "Functions", "Events"],
  },
  {
    id: "smart-contract-testing",
    title: "Smart Contract Testing",
    status: "Practicing",
    chips: ["Foundry", "Hardhat", "Testnet"],
  },
  {
    id: "wallet-ux",
    title: "Wallet UX",
    status: "Designing",
    chips: ["Connect Wallet", "Signing", "Security"],
  },
  {
    id: "decentralized-storage",
    title: "Decentralized Storage",
    status: "Exploring",
    chips: ["IPFS", "Metadata", "Ownership"],
  },
];
