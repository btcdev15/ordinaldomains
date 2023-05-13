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
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers'
import 'react-toastify/dist/ReactToastify.css';
import {
  injected,
  walletconnect,
} from "../connectors";
import { useMoralisCloudFunction } from "react-moralis";
import { useEagerConnect, useInactiveListener } from "../hooks";
import Web3 from 'web3'
import Navbar from '../components/Navbar'
import TopMarketCap from '../components/TopMarketCap'
import VisitStaking from '../components/VisitStaking'
import TopNFTs from '../components/TopNFTS'
import RecentlyCreated from '../components/RecentlyCreated'
import AnyOwnedByUser from "../components/AnyOwnedByUser";
import Price from '../components/Price'
import MintstarterServices from '../components/MintstarterServices'
import Footer from '../components/Footer'
import '../App.css'

const connectorsByName = {
  Injected: injected,
  WalletConnect: walletconnect
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



function Homepage() {
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


  const [nftbalance, setNftbalance] = React.useState(0)
  const [fvault, setFvault] = React.useState()

  const [chosen, setChosen] = React.useState()
  const [ethusdtlps, setEthusdtlps] = React.useState(0);
  const [ethusdclps, setEthudctlps] = React.useState(0);
  const [wbtcwethlps, setWbtcwethlps] = React.useState(0);
  const [ethfakelps, setEthfakelps] = React.useState(0);
  const [wbtcwethlp, setWbtcwethlp] = React.useState(0);
  const [wbtcusdc, setWbtcusdc] = React.useState(0);
  const [uniweth, setUniweth] = React.useState(0);
  const [dydxweth, setDydxweth] = React.useState(0);
  const [ftmweth, setFtmweth] = React.useState(0);
  const [wbtcwethapy, setWbtcwethapy] = React.useState('')
  const [ethusdcapy, setEthusdcapy] = React.useState('')
  const [showbar, setShowbar] = React.useState(true)

  const { fetch, data, isLoading } = useMoralisCloudFunction("getRecent", {},
  { autoFetch: true }
  );

  const contributions = useMoralisCloudFunction("getContributed", {
    "account":account
  },
  { autoFetch: false }
  );

  const [recent, setRecent] = React.useState([])
  const [contributed, setContributed] = React.useState([])
  const [loadinghelper, setLoadingHelper] = React.useState(false)

  React.useEffect(async() => {
    await fetch()
    await contributions.fetch()
    if(data && data.length){
      let myArr = []
      // data.reverse()
      for(var i = data.length - 1; i >= data.length-3; i--){
        let description = data[i].attributes.description;
        if(description.length > 80){
          description = description.substring(0, 80);
        }
        myArr.push(
          <div className="col-12 col-md-4">
            <div className="card">
              <div className="card-body">
                <img src={data[i].attributes.ipfs} width="100%" style={{maxWidth:'552px', borderRadius:'8px', padding:'10px', maxHeight:'374px'}} />
                <hr />
                <h5 style={{textAlign:'center'}}>{data[i].attributes.symbol}</h5>
                <p style={{textAlign:'center', height:'80px'}}>{description}</p>
                <a href={`/project/${data[i].attributes.address}`}>
                  <button className="btn btn-dark" style={{width:'100%'}}>Visit</button>
                </a>
              </div>
            </div>
          </div>
        )
      }
      setRecent(myArr)
      
    }
    if(account){
      let myArr2 = []
      setLoadingHelper(true)
      if(contributions.data !== [] && contributions.data !== null && contributions.data.length){
        for(let j=0; j<contributions.data.length; j++){
          myArr2.push(
            <div className="col-12 col-md-4">
            <div className="card">
              <div className="card-body">
                <img src={data[j].attributes.ipfs} width="100%" style={{maxWidth:'552px', borderRadius:'8px', padding:'10px'}} />
                <hr />
                <h5 style={{textAlign:'center'}}>{data[j].attributes.symbol}</h5>
                <p style={{textAlign:'center'}}>{data[j].attributes.description}</p>
                <a href={`/project/${data[j].attributes.address}`}>
                  <button className="btn btn-dark" style={{width:'100%'}}>Visit</button>
                </a>
              </div>
            </div>
          </div>
          )
        }
        setContributed(myArr2)
      }
      
    }



  }, [isLoading, account, loadinghelper, active])
  
  const pushSidebar = async() => {
    
    setShowbar(!showbar);
  }

  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

  const truncateEthAddress = (address) => {
    if(address !== undefined){
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
    }
  };

  const [showdex, setShowdex] = React.useState(false)

  return (
    <div>
      <Navbar />
      <div className="container">
        <br /> 
        <div>
          <h4 style={{textAlign:'center', color:'grey', fontWeight:'bold'}}>NFT Launchpad created by Blockswap </h4>
         <button className="btn btn-text" style={{margin:'0 auto', display:'block', color:'white', border:'1px dashed darkolivegreen'}} onClick={() => setShowdex(!showdex)}> Buy <span style={{color:'green', fontWeight:'bold'}}>$BLOCK</span> </button>
        
        {showdex ?          <iframe scrolling="no" height="500" width="350" style={{width:"350px",height:"500px", border: "none", borderRadius: "19px", boxShadow: "rgba(0, 0, 0, 0.1) 3px 3px 10px 4px", display: "block", margin:"0 auto"}} src="https://blockswapdex.netlify.app/swap?inputCurrency=ETH&outputCurrency=0x4636b326f19ca9b8a4c98f91672a31c617f249d3&slippage=1200&dark=dark" />      
 : null}

          {/* <TopMarketCap /> */}
          {/* <VisitStaking />  */}
          <TopNFTs />
          <RecentlyCreated />
          <div className="row">
            {/* <div className="col-12 col-md-6">
              <Price />

            </div> */}
            <div className="col-12 col-md-12">
              <MintstarterServices />
            </div>
          </div>
          <AnyOwnedByUser />

        </div>
      </div>
      <Footer />
   </div>

  ); 
}

export default Homepage;