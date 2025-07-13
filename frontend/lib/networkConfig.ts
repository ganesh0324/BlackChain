import { createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

export const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl('localnet') },
    devnet: { url: getFullnodeUrl('devnet') },
    testnet: { url: getFullnodeUrl('testnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
});

export const TESTNET_BLACKCHAIN_PACKAGE_ID = "0xfd652ed25af54bf1c8c18cc3d7bdbdf36def88dc5ec1b725c653ee57d7c8519b";