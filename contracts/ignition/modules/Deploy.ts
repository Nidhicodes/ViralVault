
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const USDTModule = buildModule("USDTModule", (m) => {
  const usdt = m.contract("MockUSDT");

  return { usdt };
});

const ContentNFTModule = buildModule("ContentNFTModule", (m) => {
  const { usdt } = m.useModule(USDTModule);

  const nft = m.contract("ContentNFT", [usdt]);

  return { nft };
});

export default ContentNFTModule;
