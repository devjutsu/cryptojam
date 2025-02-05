import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployJamCoin: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("JamCoin", {
    from: deployer,
    args: [0],
    log: true,
    autoMine: true,
  });
};

export default deployJamCoin;
deployJamCoin.tags = ["JamCoin"];
