import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
// import Analytics from './Analytics';
// import Project from './Project';
import { MoralisProvider } from "react-moralis";


import {
  injected,
} from "./connectors";
import Homepage from './pages/Homepage';
import DomainExplorer from './pages/DomainExplorer'
import ConnectModal from './components/ConnectModal'
// import Token from './Token';


import './home.css'

const connectorsByName = {
  Injected: injected
};

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const GlobalStyles = createGlobalStyle`
  body {
    // font-family: 'OpenSans';
    height: 100%;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`

function App() {
  return (
    <Router>
    <div>

    <GlobalStyles />
<Web3ReactProvider getLibrary={getLibrary}>
<ConnectModal />

          <Switch>  

          <Route path="/domain/:thedomain">
            <DomainExplorer />
          </Route>

          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
    </Web3ReactProvider>

    </div>
    </Router>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));
