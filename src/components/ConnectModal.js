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



function ConnectModal() {
  
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
    }, [activatingConnector, connector]);
  
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();
  
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);
  
    // set up block listener
    const [blockNumber, setBlockNumber] = React.useState();
    React.useEffect(() => {
      console.log('running')
      if (library) {
        let stale = false;
  
        console.log('fetching block number!!')
        library
          .getBlockNumber()
          .then(blockNumber => {
            if (!stale) {
              setBlockNumber(blockNumber);
            }
          })
          .catch(() => {
            if (!stale) {
              setBlockNumber(null);
            }
          });
  
        const updateBlockNumber = blockNumber => {
          setBlockNumber(blockNumber);
        };
        library.on("block", updateBlockNumber);
  
        return () => {
          library.removeListener("block", updateBlockNumber);
          stale = true;
          setBlockNumber(undefined);
        };
      }
    }, [library, chainId]);
  
    // fetch eth balance of the connected account
    const [ethBalance, setEthBalance] = React.useState();
    React.useEffect(() => {
      if (library && account) {
        let stale = false;
  
        library
          .getBalance(account)
          .then(balance => {
            if (!stale) {
              setEthBalance(balance);
            }
          })
          .catch(() => {
            if (!stale) {
              setEthBalance(null);
            }
          });
  
        return () => {
          stale = true;
          setEthBalance(undefined);
        };
      }
    }, [library, account, chainId]);
  
  
  
  
  
  
  
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  
    const truncateEthAddress = (address) => {
      if(address !== undefined){
      const match = address.match(truncateRegex);
      if (!match) return address;
      return `${match[1]}…${match[2]}`;
      }
    };

  return (
    <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Connect Wallet</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div className="row">
                    {account && active ? <div>
                        <p style={{textAlign:'center'}}>Connected as <span style={{fontWeight:'bold'}}>{account}</span> </p>
                        <button className="btn btn-outline-dark" style={{width:'100%'}} onClick={() =>               deactivate()}>Disconnect</button>
                        </div> : <div style={{ width:'100%'}}>
                            <p style={{textAlign:'center'}}>Connect to Ethereum</p>
                            <div className="row">
                                <div className="col" style={{cursor:'pointer'}} onClick={() => {
                                setActivatingConnector(connectorsByName["Injected"]);
                                activate(connectorsByName["Injected"]);
                                }}>
                                <img src="/metamask.png" width="100%" alt="metamask" />
                                </div>
                                <div className="col" style={{cursor:'pointer'}} onClick={() => {
                                setActivatingConnector(connectorsByName["WalletConnect"]);
                                activate(connectorsByName["WalletConnect"]);
                                }}>
                                <img src="/walletconnect.png" width="100%" alt="walletconnect" />

                                </div>
                                <div className="col" style={{cursor:'pointer'}} onClick={() => {
                                setActivatingConnector(connectorsByName["Injected"]);
                                activate(connectorsByName["Injected"]);
                                }}>
                                <img src="/trustwallet.svg" width="100%" alt="trustwallet" />

                                </div>
                            </div>
                            </div>}
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>


    </div>


  ); 
}

export default ConnectModal;
