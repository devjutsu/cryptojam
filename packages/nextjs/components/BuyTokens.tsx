import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function BuyToken() {
  const { writeContractAsync, isPending } = useWriteContract();
  const [xjamAmount, setXjamAmount] = useState("");
  const [ethCost, setEthCost] = useState("0");
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const { data: tokenPrice } = useScaffoldReadContract({
    contractName: "JamCoin",
    functionName: "getCurrentPrice",
  });

  const { data: userBalance } = useScaffoldReadContract({
    contractName: "JamCoin",
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    if (tokenPrice && xjamAmount) {
      setEthCost(formatEther(BigInt(xjamAmount) * BigInt(tokenPrice)));
    } else {
      setEthCost("0");
    }
  }, [xjamAmount, tokenPrice]);

  const handleBuyTokens = async () => {
    if (!isConnected) {
      console.error("Wallet is not connected");
      return;
    }

    try {
      console.log("Sending transaction to buyTokens...");
      writeContractAsync({
        address: DeployedContracts[31337].JamCoin.address,
        abi: DeployedContracts[31337].JamCoin.abi,
        functionName: "buyTokens",
        value: parseEther(ethCost || "0"),
      });

      console.log("Transaction sent successfully");
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Buy JamCoin</h2>
      {isConnected ? (
        <>
          <p className="text-sm text-gray-600">Wallet: {address}</p>
          <p className="text-sm text-gray-600 mb-2">Balance: {balance?.formatted} ETH</p>
          <p className="text-sm text-gray-600 mb-2">
            Your XJAM Balance: {userBalance ? formatEther(userBalance) : "0"}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Current Price: {tokenPrice ? formatEther(tokenPrice) : "Loading..."} ETH per XJAM
          </p>
          <input
            type="number"
            placeholder="Enter XJAM amount"
            value={xjamAmount}
            onChange={e => setXjamAmount(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <p className="text-sm text-gray-600 mb-2">Cost in ETH: {ethCost}</p>
          <button
            onClick={handleBuyTokens}
            disabled={isPending || !xjamAmount || parseFloat(xjamAmount) <= 0}
            className="btn btn-primary w-full"
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
