import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";

const JAMCOIN_CONTRACT = "0xYourJamCoinContractAddress";
const JAMCOIN_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export default function BuyTokens() {
  const [amount, setAmount] = useState("1");
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const { writeContract, isPending } = useWriteContract();

  const handleBuyTokens = () => {
    writeContract({
      address: JAMCOIN_CONTRACT,
      abi: JAMCOIN_ABI,
      functionName: "buyTokens",
      args: [parseEther(amount || "1")],
      value: parseEther(amount || "1"),
    });
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto hover:bg-gradient-to-t from-primary/20 to-transparent">
      {/* <h2 className="text-xl font-bold mb-4">Buy JamCoin</h2> */}
      {isConnected ? (
        <>
          <p className="text-sm text-gray-600">Wallet: {address}</p>
          <p className="text-sm text-gray-600 mb-2">Balance: {balance?.formatted} ETH</p>
          <input
            type="number"
            placeholder="Enter ETH amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <button
            onClick={handleBuyTokens}
            disabled={isPending}
            className="btn border-none btn-primary w-full bg-primary"
          >
            {isPending ? "Processing..." : "Buy JamCoin"}
          </button>
        </>
      ) : (
        <p className="text-red-500">Please connect your wallet.</p>
      )}
    </div>
  );
}
