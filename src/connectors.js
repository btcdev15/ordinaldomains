import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
  5: "https://goerli.infura.io/v3/aee4dd30db8a42aa935d0f714ee521ae",
  56:"https://bsc-dataseed.binance.org/",
  137:"https://rpc.ankr.com/polygon"
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 56, 137]
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 137: RPC_URLS[137], 1: RPC_URLS[1], 56: RPC_URLS[56] },
  qrcode: true
})

