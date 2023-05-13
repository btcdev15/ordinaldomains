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
} from "./connectors";
import { useMoralisCloudFunction } from "react-moralis";
import { useEagerConnect, useInactiveListener } from "./hooks";
import Web3 from 'web3'
import './App.css'

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



function Token() {
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



  const [showbar, setShowbar] = React.useState(true)






  
  const pushSidebar = async() => {
    
    setShowbar(!showbar);
  }



  return (
    <div>



    <div className={showbar ? "vertical-nav text-white" : "vertical-nav text-white active"} style={{width:'100%', maxWidth:'200px', height:'100vh', maxHeight:'100vh', background:'#FFFFFF', boxShadow:'none'}} id="sidebar">
 <div class="py-4 px-3 mb-4">
   <div class="media d-flex align-items-center">     
    <img src="/mintstarter.png" alt="logo" width="100%" />
   </div>
   <select class="form-select d-block d-sm-none" aria-label="Default select example" onChange={(event) => window.location.href=event.target.value} >
  <option value="/" selected>Polygon</option>
  <option value="https://mintstarter.app">Ethereum</option>
</select>   <hr style={{color:'black'}} />
 </div>


 <ul class="nav flex-column mb-0">
   <li class="nav-item">
   <a href="/" class="nav-link text-black" aria-current="page" >
       <img className="bi me-2" src="/home.png" width="20px" alt="home icon" />
         Home
       </a>
     </li>
   <li class="nav-item">
   <a href="/create" class="nav-link text-black" aria-current="page" >
       <img className="bi me-2" src="/rocket.png" width="20px" alt="launchpad icon" />
         Launch Pad
       </a>
   </li>
   <li class="nav-item">
   <a href="/nftdrop" class="nav-link text-black" aria-current="page" >
       <img className="bi me-2" src="/cube.png" width="20px" alt="nft drop icon" />
         NFT Drop
       </a>
   </li>
   <li class="nav-item">
   <a href="/kyc" class="nav-link text-black" aria-current="page" >
       <img className="bi me-2" src="/kyc.png" width="20px" alt="kyc icon" />
         KYC & Audit
       </a>
   </li>
   <li class="nav-item">
   <a href="https://minstarter.app/token" class="nav-link text-white" aria-current="page" style={{background:'green'}} >
       <img className="bi me-2" src="/mint.png" width="20px" alt="mint icon" />
         MINT Token
       </a>
   </li>
   <li class="nav-item">
   <a href="https://www.dextools.io/app/ether/pair-explorer/0xa23ad2b0fd9cf4f2a056dc249d95777a6e3b21ac" target="_blank" rel="noreferrer" class="nav-link text-black" aria-current="page" >
       <img className="bi me-2" src="/dextools.png" width="20px" alt="mint icon" />
         Dex Tools
       </a>
   </li>
   <li class="nav-item">
   <a href="https://drive.google.com/file/d/1Tmadanp4NcQe05rTWPwRoekQVqsv2Jtv/view" target="_blank" rel="noreferrer" class="nav-link text-black" aria-current="page" >
       <img className="bi me-2" src="/whitepaper.png" width="20px" alt="mint icon" />
         Whitepaper
       </a>
   </li>
 </ul>

 
</div>


<div className={showbar ? "page-content p-1" : "page-content p-2 active"} id="content">
  
<div className="col-12">
       <div className="row" style={{padding:'15px', background:'white', height:'100%', marginTop:'-5px'}}>
          <div className="col-3 d-none d-sm-block">
            <a href="https://discord.com" target="_blank" rel="noreferrer">
            <img className="bi me-2" src="/insta.png" width="50px" alt="discord icon" />
            </a>
            <a href="https://twitter.com/Mintstarter" target="_blank" rel="noreferrer">
            <img className="bi me-2" src="/twitter.png" width="50px" alt="twitter icon"  />
            </a>
            <a href="https://t.me/mintstarter" target="_blank" rel="noreferrer">
            <img className="bi me-2" src="/telegram.png" width="50px" alt="telegram icon"  />
            </a>
          </div>
          <div className="d-inline d-sm-none col-3 col-md-5 col-lg-5">
          <button className="btn btn-text" style={{fontWeight:'bold', color:'green'}} onClick={pushSidebar}> <img src="/hamburger.png" alt="creation" width="20px" />  </button>
          </div>
          <div className="col-9 col-md-9 col-lg-9" style={{textAlign:'right'}}>
          <select class="form-select d-none d-md-inline " aria-label="Default select example" onChange={(event) => window.location.href=event.target.value} style={{display:'inline', width:'200px', marginRight:'1%', verticalAlign:'middle'}}>
  <option value="/" selected>Polygon</option>
  <option value="https://mintstarter.app">Ethereum</option>
</select> 
          <a href="/create" style={{marginRight:'1%'}}>
          <button className="btn btn-outline-dark"> <img src="/btntext.png" alt="creation" width="20px" />  <span className="d-none d-sm-inline" style={{display:'flow'}}> Create </span></button>
          </a>
          {active ?             <button className="btn btn-dark" style={{border:'0', width:"100%", maxWidth:'139px'}} onClick={() => {
              deactivate();
            }}>Disconnect</button>
:             <button className="btn btn-dark" style={{border:'0', minWidth:'80px'}}  onClick={() => {
  setActivatingConnector(connectorsByName["Injected"]);
  activate(connectorsByName["Injected"]);
   }}> <img src="/wallet.png" width="20px" /> <span className="d-none d-sm-inline" style={{display:'flow'}}> Connect Wallet </span></button>
}          </div>
       </div>

       <div className="row" style={{marginTop:'15px', textAlign:'center'}}>
         <img src="/token_bg.svg" width="100%" style={{maxWidth:'85%', margin:'0 auto', display:'block'}} />
       </div>

       <div className="row" style={{marginTop:'3%', textAlign:'center'}}>
         <h2>A unique, high-utility token</h2>
         <p style={{maxWidth:'787px', margin:'0 auto'}}>
         Mintstarter operates the MINT digital asset accross its platform as an utilitarian token. 
        </p>
        <div>
        <iframe scrolling="no" height="500" width="350" style={{width:"350px",height:"500px", border: "none", borderRadius: "19px", boxShadow: "rgba(0, 0, 0, 0.1) 3px 3px 10px 4px", display: "block", margin:"0 auto"}} src="https://ethcustom.liquidswap.trade/swap?inputCurrency=ETH&outputCurrency=0x583673B49eE3ae9E59c0B2fa662115952E1d28fd&bg=ffffff&slippage=1200&card=ffffff&dark=light" />        </div>
       </div>
       <hr />
       <div className="container" style={{marginTop:'3%'}}>
         <div className="row">
          <div className="row" style={{margin:'0 auto'}}>
          <div className="col-12 col-md-6 col-lg-6">
          <h4>Industry Insights</h4> 
            <p>
                The advertising industry operates $763bn annually, with an average of 15% growth year after year. 
                Until 2020, when the coronavirus put a halt on many industries, the spending on advertising worldwide has been increasing steadily. Luckily, the market saw healthy growth in 2021 and is expected to continue on the path and surpass one trillion U.S. dollars in 2026 . North America is the region that invests most in advertising, however, Asia Pacific has been on its heels for quite some time, and Western Europe closes the top three. 
            </p>
            <p>
                Despite the coronavirus pandemic, the market has been growing, with more and more businesses going digital and therefore advertising online. 
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
              <img src="/ads.svg" width="100%" alt="ads" style={{height:'50%'}} />
          </div>
          </div>


          <div className="row" style={{margin:'0 auto'}}>
          <div className="col-12 col-md-6 col-lg-6">
              <img src="/ads2.svg" width="100%" alt="ads" style={{height:'80%'}} />
          </div>
          <div className="col-12 col-md-6 col-lg-6" style={{marginTop:'7%'}}>
            <h4>Large Value Deals</h4> 
            <p>
                MINT token is the utility token of Mintstarter. Mintstarter takes the development hassle out of launching NFT collections and places the power directly in the hands of the artist. Creating a platform where artists can input their data into our launchpad and create an Nft drop page sharable with communities interested in minting NFTS on Mintstarters flawless and audited tech. 
            </p>
            <p>
                With a large number of site visitors on a daily basis, we allow NFT projects to promote on our site while paying for site placements using Mintstarter. Our token can be used in a safe B2B environment which will guarantee 
                larger deals closed and therefore benefit the entire token community.
            </p>
          </div>

          
          </div>
          <div className="row" style={{margin:'0 auto'}}>
          <div className="col-12 col-md-6 col-lg-6" style={{marginTop:'7%'}}>
          <h4>Staking</h4> 
            <p>
                With an eye on De-Fi-enabling solutions, we bring high rewarding staking and farming, with well thought economics to benefit the community and providing high returns. 
            </p>
            <p>
                Minstarter users can now benefit both from holding their tokens and staking their capital in order to generate larger rewards over time. 
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
              <img src="/ads3.svg" width="100%" alt="ads" style={{height:'80%'}} />
          </div>
          </div>


         </div>
       </div>
       </div>
       <br /> <br />
       <footer style={{color:'black', background:'white'}}>
  <div className="container" style={{padding:'10px'}}>
    <div className="row" style={{marginTop:'5%'}}>
      <div className="col-12 col-md-6">
            <div className="row" style={{textAlign:'center'}}>
            <div className="col-4 col-md-4">
              <h6>Collection</h6>
              <a href="/create" style={{color:'grey', textDecoration:'none'}}>Create</a>
            </div>
            <div className="col-4 col-md-4">
              <h6>Company</h6>
              <a href="/" style={{color:'grey', textDecoration:'none'}}>Home</a>
              <p>
              <a href="https://info.minstarter.app" target="_blank" rel="noreferrer" style={{color:'grey', textDecoration:'none'}}>Info</a>
              </p>

            </div>
            <div className="col-4 col-md-4">
              <h6>Help Center</h6>
              <a href="/privacy"  style={{color:'grey', textDecoration:'none'}}>Privacy Policy</a>
              <p>
              <a href="/terms" target="_blank" rel="noreferrer" style={{color:'grey', textDecoration:'none'}}>Terms of Use</a>
              </p>
            </div>
            </div>
      </div>
      <div className="col-12 col-md-6" style={{textAlign:'center'}}>
                <h6>Wanna stay in touch?</h6>
                <p style={{color:'grey'}}>Join us on any of these platforms!</p>
                <div className="col-12">
            <a href="https://discord.com" target="_blank" rel="noreferrer">
            <img className="bi me-2" src="/insta.png" width="50px" alt="discord icon" />
            </a>
            <a href="https://twitter.com/Mintstarter" target="_blank" rel="noreferrer">
            <img className="bi me-2" src="/twitter.png" width="50px" alt="twitter icon"  />
            </a>
            <a href="https://t.me/mintstarter" target="_blank" rel="noreferrer">
            <img className="bi me-2" src="/telegram.png" width="50px" alt="telegram icon"  />
            </a>
          </div>
      </div>

    </div>
  <h6 style={{textAlign:'center'}}>Mintstarter</h6>
  <p style={{textAlign:'center'}}>©2022, All Rights Reserved </p>
  </div>

</footer>
  

</div>
   </div>

  ); 
}

export default Token;