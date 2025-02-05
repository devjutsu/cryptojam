import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployNFTunes: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const jamCoin = await get("JamCoin");
  
  await deploy("NFTunes", {
    from: deployer,
    args: [jamCoin.address],
    log: true,
    autoMine: true,
  });
};

export default deployNFTunes;
deployNFTunes.tags = ["NFTunes"];
