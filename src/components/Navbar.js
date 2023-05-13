

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core";


import 'react-toastify/dist/ReactToastify.css';
import {
  injected,
  walletconnect,
} from "../connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import Web3 from 'web3'

const connectorsByName = {
  Injected: injected,
  WalletConnect: walletconnect
};




function NavBar() {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    console.log('running')
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector, account]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);







  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

  const truncateEthAddress = (address) => {
    if(address !== undefined){
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
    }
  };

  return (
<nav class="navbar navbar-expand-lg navbar-dark" style={{background:'#1e2023', minHeight:'80px'}}>
  <a class="navbar-brand" href="/" style={{marginLeft:"3%"}}> <img src="/logo.svg" alt="logo" /> </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/">Dashboard </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/services">Services</a>
      </li>
      {/* <li class="nav-item">
        <a class="nav-link" href="https://stake.mintstarter.app">Staking</a>
      </li> */}
      <li class="nav-item">
        <a class="nav-link" target="_blank" rel="noreferrer" href="https://mintstarter.gitbook.io/mintstarter/mintstarter/summary">Docs</a>
      </li>
      {/* <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}

    </ul>
    <div class="d-flex" style={{minWidth:'120px'}}>
        {account && active ?         <button class="btn btn-outline-light"  data-toggle="modal" data-target="#exampleModal" style={{borderRadius:'25px', width:'100%'}} type="button">  {chainId == 1 ? <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png" width="20px" /> : chainId == 56 ? <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png" width="20px" /> : <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png" width="20px" />}  <span> {truncateEthAddress(account)} </span></button>
        :         <button class="btn btn-outline-light"  data-toggle="modal" data-target="#exampleModal" style={{borderRadius:'25px', width:'98%'}} type="button"> <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png" width="20px" /> <span> Connect </span></button>
      }
    </div>
    <div class="d-flex">
    <a href="https://t.me/mintstarter" target="_blank" rel="noreferrer">
    <img src="/telegram.svg" width="40px" />
    </a>
    </div>
  </div>


</nav>


  ); 
}

export default NavBar;