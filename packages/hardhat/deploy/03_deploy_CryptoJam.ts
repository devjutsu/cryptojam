import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCryptoJam: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const jamCoin = await get("JamCoin");
  const nftunes = await get("NFTunes");

  await deploy("CryptoJam", {
    from: deployer,
    args: [jamCoin.address, nftunes.address],
    log: true,
    autoMine: true,
  });
};

export default deployCryptoJam;
deployCryptoJam.tags = ["CryptoJam"];
deployCryptoJam.dependencies = ["JamCoin", "NFTunes"];
